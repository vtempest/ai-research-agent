import { google, docs_v1 } from 'googleapis';
import { tursoQueries } from '@/lib/database/turso';

export interface GoogleDocsConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export class GoogleDocsService {
  private oauth2Client: InstanceType<typeof google.auth.OAuth2>;
  private docs: docs_v1.Docs;

  constructor(config: GoogleDocsConfig, accessToken?: string, refreshToken?: string) {
    this.oauth2Client = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      config.redirectUri
    );

    if (accessToken) {
      this.oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }

    this.docs = google.docs({ version: 'v1', auth: this.oauth2Client });
  }

  /**
   * Generate OAuth URL for user authorization
   */
  static getAuthUrl(config: GoogleDocsConfig): string {
    const oauth2Client = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      config.redirectUri
    );

    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/documents',
        'https://www.googleapis.com/auth/drive.readonly',
      ],
    });
  }

  /**
   * Exchange authorization code for tokens
   */
  static async getTokensFromCode(
    config: GoogleDocsConfig,
    code: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const oauth2Client = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      config.redirectUri
    );

    const { tokens } = await oauth2Client.getToken(code);

    return {
      accessToken: tokens.access_token!,
      refreshToken: tokens.refresh_token!,
    };
  }

  /**
   * Convert markdown to Google Docs format
   */
  private markdownToGoogleDocs(markdown: string): docs_v1.Schema$Request[] {
    const requests: docs_v1.Schema$Request[] = [];
    const lines = markdown.split('\n');
    let currentIndex = 1;

    lines.forEach((line) => {
      if (!line.trim()) {
        // Empty line
        requests.push({
          insertText: {
            text: '\n',
            location: { index: currentIndex },
          },
        });
        currentIndex += 1;
        return;
      }

      // Handle headings
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2] + '\n';

        requests.push({
          insertText: {
            text,
            location: { index: currentIndex },
          },
        });

        requests.push({
          updateParagraphStyle: {
            range: {
              startIndex: currentIndex,
              endIndex: currentIndex + text.length - 1,
            },
            paragraphStyle: {
              namedStyleType: `HEADING_${level}` as any,
            },
            fields: 'namedStyleType',
          },
        });

        currentIndex += text.length;
        return;
      }

      // Handle bold **text**
      const boldRegex = /\*\*(.+?)\*\*/g;
      let processedLine = line;
      const boldMatches = [...line.matchAll(boldRegex)];

      if (boldMatches.length > 0) {
        processedLine = line.replace(boldRegex, '$1');
        requests.push({
          insertText: {
            text: processedLine + '\n',
            location: { index: currentIndex },
          },
        });

        boldMatches.forEach((match) => {
          const startOffset = line.indexOf(match[0]);
          requests.push({
            updateTextStyle: {
              range: {
                startIndex: currentIndex + startOffset,
                endIndex: currentIndex + startOffset + match[1].length,
              },
              textStyle: {
                bold: true,
              },
              fields: 'bold',
            },
          });
        });

        currentIndex += processedLine.length + 1;
        return;
      }

      // Regular text
      requests.push({
        insertText: {
          text: line + '\n',
          location: { index: currentIndex },
        },
      });
      currentIndex += line.length + 1;
    });

    return requests;
  }

  /**
   * Export document to Google Docs
   */
  async exportToGoogleDocs(
    title: string,
    content: string,
    documentId: string,
    userId?: string
  ): Promise<{ googleDocId: string; url: string }> {
    try {
      // Create a new Google Doc
      const createResponse = await this.docs.documents.create({
        requestBody: {
          title,
        },
      });

      const googleDocId = createResponse.data.documentId!;

      // Convert markdown content to Google Docs format
      const requests = this.markdownToGoogleDocs(content);

      // Update the document with content
      if (requests.length > 0) {
        await this.docs.documents.batchUpdate({
          documentId: googleDocId,
          requestBody: {
            requests,
          },
        });
      }

      // Save sync information

      return {
        googleDocId,
        url: `https://docs.google.com/document/d/${googleDocId}/edit`,
      };
    } catch (error: any) {
      throw new Error(`Failed to export to Google Docs: ${error.message}`);
    }
  }

  /**
   * Import document from Google Docs
   */
  async importFromGoogleDocs(googleDocId: string): Promise<{ title: string; content: string }> {
    try {
      const response = await this.docs.documents.get({
        documentId: googleDocId,
      });

      const doc = response.data;
      const title = doc.title || 'Untitled';

      // Extract text content (simplified - doesn't preserve all formatting)
      let content = '';
      const body = doc.body;

      if (body && body.content) {
        body.content.forEach((element) => {
          if (element.paragraph) {
            const paragraph = element.paragraph;
            if (paragraph.elements) {
              paragraph.elements.forEach((elem) => {
                if (elem.textRun) {
                  content += elem.textRun.content || '';
                }
              });
            }
          }
        });
      }

      return {
        title,
        content: content.trim(),
      };
    } catch (error: any) {
      throw new Error(`Failed to import from Google Docs: ${error.message}`);
    }
  }

  /**
   * Share Google Doc with specific users
   */
  async shareGoogleDoc(
    googleDocId: string,
    emailAddress: string,
    role: 'reader' | 'writer' | 'commenter' = 'reader'
  ): Promise<void> {
    try {
      const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

      await drive.permissions.create({
        fileId: googleDocId,
        requestBody: {
          type: 'user',
          role,
          emailAddress,
        },
        sendNotificationEmail: true,
      });
    } catch (error: any) {
      throw new Error(`Failed to share Google Doc: ${error.message}`);
    }
  }

  /**
   * Get sharing link for Google Doc
   */
  async getShareableLink(googleDocId: string): Promise<string> {
    try {
      const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

      // Make the document accessible to anyone with the link
      await drive.permissions.create({
        fileId: googleDocId,
        requestBody: {
          type: 'anyone',
          role: 'reader',
        },
      });

      // Get the web view link
      const file = await drive.files.get({
        fileId: googleDocId,
        fields: 'webViewLink',
      });

      return file.data.webViewLink || `https://docs.google.com/document/d/${googleDocId}/edit`;
    } catch (error: any) {
      throw new Error(`Failed to get shareable link: ${error.message}`);
    }
  }

  /**
   * Get sync status for a document
   */
  static async getSyncStatus(documentId: string): Promise<{
    isSynced: boolean;
    googleDocId?: string;
    lastSyncedAt?: string;
  }> {
    const sync = await tursoQueries.getGoogleDocSync(documentId);

    if (!sync) {
      return { isSynced: false };
    }

    return {
      isSynced: true,
      googleDocId: sync.googleDocId,
      lastSyncedAt: sync.lastSyncedAt,
    };
  }

  /**
   * Remove sync relationship
   */
  static async removeSyncStatus(documentId: string): Promise<void> {
    await tursoQueries.deleteGoogleDocSync(documentId);
  }
}

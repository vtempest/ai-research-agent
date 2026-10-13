'use client';

import { Flexbox, Markdown } from '@lobehub/ui';
import { Alert, AutoComplete, Button, Text, TextArea } from '@lobehub/ui/base-ui';
import { createStaticStyles } from 'antd-style';
import { KeyRoundIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { createGuestKeyModal } from './createGuestKeyModal';
import GuestKeyForm from './GuestKeyForm';
import { GUEST_DEFAULT_MODEL, GUEST_MODEL_SUGGESTIONS } from './openrouter';
import { guestOpenRouterSelectors, useGuestOpenRouterStore } from './store';

const styles = createStaticStyles(({ css, cssVar }) => ({
  bubble: css`
    max-width: 100%;
    padding-block: 8px;
    padding-inline: 12px;
    border-radius: ${cssVar.borderRadiusLG};
  `,
  page: css`
    width: 100%;
    max-width: 820px;
    height: 100dvh;
    margin-inline: auto;
    padding: 16px;
  `,
  panel: css`
    padding: 20px;
    border: 1px solid ${cssVar.colorBorderSecondary};
    border-radius: ${cssVar.borderRadiusLG};
    background: ${cssVar.colorBgContainer};
  `,
  user: css`
    align-self: flex-end;
    background: ${cssVar.colorFillSecondary};
  `,
}));

const MessageList = () => {
  const { t } = useTranslation('qwksearch');
  const [messages, sending] = useGuestOpenRouterStore((s) => [s.messages, s.sending]);
  const endRef = useRef<HTMLDivElement>(null);

  const lastLength = messages.at(-1)?.content.length ?? 0;
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length, lastLength]);

  if (messages.length === 0) {
    return (
      <Flexbox align={'center'} flex={1} justify={'center'}>
        <Text type={'secondary'}>{t('guestChat.empty')}</Text>
      </Flexbox>
    );
  }

  return (
    <Flexbox flex={1} gap={12} style={{ minHeight: 0, overflowY: 'auto' }}>
      {messages.map((message, index) =>
        message.role === 'user' ? (
          <div className={`${styles.bubble} ${styles.user}`} key={index}>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{message.content}</Text>
          </div>
        ) : (
          <div className={styles.bubble} key={index}>
            <Markdown>{message.content || (sending ? '…' : '')}</Markdown>
          </div>
        ),
      )}
      <div ref={endRef} />
    </Flexbox>
  );
};

const Composer = () => {
  const { t } = useTranslation('qwksearch');
  const [sending, send, stop] = useGuestOpenRouterStore((s) => [s.sending, s.send, s.stop]);
  const [draft, setDraft] = useState('');

  const submit = () => {
    if (!draft.trim() || sending) return;
    void send(draft);
    setDraft('');
  };

  return (
    <Flexbox gap={8}>
      <TextArea
        autoSize={{ maxRows: 8, minRows: 2 }}
        placeholder={t('guestChat.placeholder')}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <Flexbox horizontal gap={8} justify={'flex-end'}>
        {sending ? (
          <Button onClick={stop}>{t('guestChat.stop')}</Button>
        ) : (
          <Button disabled={!draft.trim()} type={'primary'} onClick={submit}>
            {t('guestChat.send')}
          </Button>
        )}
      </Flexbox>
    </Flexbox>
  );
};

/**
 * A no-account chat for the demo. Talks to OpenRouter directly from the
 * browser with the visitor's own key; see `openrouter.ts`.
 */
const GuestChat = () => {
  const { t } = useTranslation('qwksearch');
  const [hasKey, maskedKey, model, setModel, error, messages, clearConversation] =
    useGuestOpenRouterStore((s) => [
      guestOpenRouterSelectors.hasKey(s),
      guestOpenRouterSelectors.maskedKey(s),
      s.model,
      s.setModel,
      s.error,
      s.messages,
      s.clearConversation,
    ]);

  return (
    <Flexbox className={styles.page} gap={16}>
      <Flexbox horizontal align={'center'} gap={12} justify={'space-between'} wrap={'wrap'}>
        <Flexbox gap={2}>
          <Text strong fontSize={18}>
            {t('guestChat.title')}
          </Text>
          <Text type={'secondary'}>{t('guestChat.subtitle')}</Text>
        </Flexbox>
        {hasKey && (
          <Flexbox horizontal align={'center'} gap={8}>
            {messages.length > 0 && (
              <Button size={'small'} onClick={clearConversation}>
                {t('guestChat.newChat')}
              </Button>
            )}
            <Button
              icon={<KeyRoundIcon size={14} />}
              size={'small'}
              title={maskedKey}
              onClick={() => createGuestKeyModal()}
            >
              {t('guestKey.actions.manage')}
            </Button>
          </Flexbox>
        )}
      </Flexbox>

      {hasKey ? (
        <>
          <Flexbox horizontal align={'center'} gap={8}>
            <Text style={{ flex: 'none' }} type={'secondary'}>
              {t('guestChat.model')}
            </Text>
            <AutoComplete
              options={GUEST_MODEL_SUGGESTIONS}
              placeholder={GUEST_DEFAULT_MODEL}
              style={{ flex: 1 }}
              value={model}
              onChange={setModel}
            />
          </Flexbox>
          <MessageList />
          {error && <Alert showIcon title={error} type={'error'} />}
          <Composer />
        </>
      ) : (
        <Flexbox className={styles.panel} gap={8}>
          <Text strong>{t('guestKey.title')}</Text>
          <GuestKeyForm />
        </Flexbox>
      )}
    </Flexbox>
  );
};

export default GuestChat;

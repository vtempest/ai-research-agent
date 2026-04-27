"use client";

import { Filemanager, Willow } from "@svar-ui/react-filemanager";
import "@svar-ui/react-filemanager/all.css";
import {
  Dialog,
  DialogContent
} from "../ui/dialog";
import { getData } from "./filemanager-data";
import { defaultDocuments } from "../documents/defaultDocuments";
import type { Document } from "../documents/DocumentTree";

interface FileManagerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documents?: Document[];
}

export function FileManagerModal({ open, onOpenChange, documents = defaultDocuments }: FileManagerModalProps) {
  const data = getData(documents).map((item) => ({
    id: item.id,
    name: item.name,
    type: item.type,
    size: item.size ?? 0,
    date: item.date ? new Date(item.date) : new Date(),
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 flex flex-col">

        <div className="flex-1 overflow-hidden ">
          <div className="h-full rounded-md overflow-hidden">
            <Willow>
              <Filemanager data={data} />
            </Willow>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

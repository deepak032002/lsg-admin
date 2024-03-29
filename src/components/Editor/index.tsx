import React, { useEffect, useRef } from "react";
import { Card } from "@material-tailwind/react";
import { GalleryInsert } from "./GalleryInsert";
import {
  MDXEditor,
  codeBlockPlugin,
  codeMirrorPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  ListsToggle,
  Separator,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  imagePlugin,
  InsertTable,
  linkDialogPlugin,
  tablePlugin,
  MDXEditorMethods,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import "./editor.css";

import { EditorProps } from "./interface";
import { useAxios } from "hooks/useAxios";

const Editor: React.FC<EditorProps> = ({ content }) => {
  const axiosInstance = useAxios(true);
  const axiosWithoutToken = useAxios(false);
  const editorRef = useRef<MDXEditorMethods>(null);
  async function imageUploadHandler(image: File) {
    const res = await axiosInstance.get<ApiResponse<{ url: string }>>(
      "/upload-image"
    );
    const form = new FormData();
    form.append("file", image);
    const imageData = await axiosWithoutToken.put(res.data.result.url, form);

    return imageData.data.secure_url;
  }

  useEffect(() => {
    editorRef.current?.setMarkdown(content);
  }, [content]);

  return (
    <MDXEditor
      markdown={content}
      contentEditableClassName="editor-content"
      ref={editorRef}
      onChange={(markdown) => {
        console.log(markdown);
        editorRef.current?.setMarkdown(markdown);
      }}
      plugins={[
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        imagePlugin({ imageUploadHandler }),
        tablePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <Separator />
              <ListsToggle />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <Separator />
              <GalleryInsert editorRef={editorRef} />
            </>
          ),
        }),
      ]}
    />
  );
};

export default Editor;

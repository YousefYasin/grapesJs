import React, { useLayoutEffect } from "react";
import basicBlockPlugin from "grapesjs-blocks-basic";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import ReactDOM from "react-dom/client";
import PostFeed from "./PostFeed";

const Index = () => {
  useLayoutEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",
      width: "100%",
      plugins: [basicBlockPlugin],
      blockManager: {},
      canvas: {
        styles: ["post.css", "antd/dist/reset.css"],
      },
    });
    editor.DomComponents.addType("react-component", {
      model: {
        defaults: {
          tagName: "div",
          draggable: true,
          droppable: true,
          attributes: { class: "react-component-wrapper" },
          style: {},
          traits: [
            {
              type: "text",
              label: "Width",
              name: "width",
              placeholder: "300px",
            },
            {
              type: "text",
              label: "Height",
              name: "height",
              placeholder: "200px",
            },
            {
              type: "text",
              label: "Margin",
              name: "margin",
              placeholder: "10px",
            },
            {
              type: "text",
              label: "Padding",
              name: "padding",
              placeholder: "10px",
            },
          ],
        },
      },
      view: {
        init() {
          const el = this.el;
          const root = ReactDOM.createRoot(el);
          root.render(<PostFeed text="Hello from GrapesJS!" />);
        },
      },
    });
    editor.BlockManager.add("react-component-block", {
      label: "Post Block",
      content: { type: "react-component" },
      category: "Custom",
      attributes: { class: "fa fa-cube" },
    });
  }, []);

  return <div id="gjs"></div>;
};

export default Index;

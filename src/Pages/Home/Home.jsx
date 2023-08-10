import React, { useEffect, useState } from "react";
import "./Home.css";
import { marked } from "marked";
import MarkDownEditor from "../../components/MarkDownEditor/MarkDownEditor";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";

const text = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

`;

function Home() {
  const [markdown, setMarkdown] = useState(text);
  const [expansive, setExpansive] = useState(true)




  const handleExpansive = () => {
    if(expansive){
      setExpansive(false)
    } else{
      setExpansive(true)
    }
  }

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const getMarkdownText = () => {
    const rawMarkup = marked(markdown);
    const cleanHTML = DOMPurify.sanitize(rawMarkup);
    return { __html: cleanHTML };
  };

  useEffect(() => {
    getMarkdownText();
  }, [markdown]);





  return (
    <>
      <div id="container">
        <div className={expansive ? "open" : "close"} id="wrapper-editor">
          <div id="header-editor">
            <span>Editor</span>
          </div>
          <MarkDownEditor onChange={handleChange} value={markdown} />
        </div>
        <div id="wrapper-preview">
          <div id="header-preview">
            <span>Previewer</span>
            <button id="button" onClick={handleExpansive}>
              <FontAwesomeIcon icon={faMaximize} />
            </button>
          </div>
          <div id="preview" dangerouslySetInnerHTML={getMarkdownText()} />
        </div>
      </div>
    </>
  );
}

export default Home;

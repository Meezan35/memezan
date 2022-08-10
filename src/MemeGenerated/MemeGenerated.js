import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import CopyToClipboard from "react-copy-to-clipboard";
export const MemeGenerated = () => {
  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get("url");
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    setCopied(true);
  };
  return (
    <div className={styles.container}>
      <button className={styles.home} onClick={() => history.push("/")}>
        Make More Memes
      </button>
      {url && <img alt="meme" src={url} />}
      <CopyToClipboard text={url}>
        <button onClick={copyLink} className={styles.copy}>
          {copied ? "Link Copied" : "Copy Link"}
        </button>
      </CopyToClipboard>
    </div>
  );
};

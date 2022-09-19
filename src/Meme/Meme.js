import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";

export const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const history = useHistory();

  const updateCaptions = (e, index) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const generateMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();
    formData.append("username", "meezan35");
    formData.append("password", "memezan@35");
    formData.append("template_id", currentMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
        history.push(`/generated?url=${res.data.url}`);
      });
  };

  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((memes) => {
        shuffleMemes(memes.data.memes);
        setMemes(memes.data.memes);
      });
    console.log(memes);
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(""));
      console.log(captions);
    }
  }, [memeIndex, memes]);

  return memes.length ? (
    <div className={styles.container}>
      
      
      <img src={memes[memeIndex].url} alt="meme" className='img' />
      {captions.map((c, index) => (
        <input onChange={(e) => updateCaptions(e, index)} key={index} />
      ))}
      <button className={styles.generate} onClick={generateMeme}>
        Generate
      </button>
      <button
        className={styles.skip}
        onClick={() => setMemeIndex(memeIndex + 1)}
      >
        Skip
      </button>
    </div>
  ) : (
    <></>
  );
};

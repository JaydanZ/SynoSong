import React, { useRef } from "react";
import { searchSongs } from "../../services/QueryWordService";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const wordInputRef = useRef<HTMLInputElement>(null);

  const searchWordHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const wordInput: string | undefined = wordInputRef.current?.value;
    if (wordInput != null) {
      searchSongs(wordInput)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className={styles.searchBoxContainer}>
      <form onSubmit={searchWordHandler}>
        <input type="text" ref={wordInputRef} />
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchBox;

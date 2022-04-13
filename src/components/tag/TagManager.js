export const getTags = () => {
    return fetch("http://localhost:8088/tags")
      .then(res => res.json())
  };

export const getEntryTags = () => {
    return fetch("http://localhost:8088/entrytags")
        .then(res => res.json())
};

export const addEntryTag = EntryTag => {
    return fetch("http://localhost:8088/entrytags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(EntryTag)
    }).then(getEntryTags);
  };
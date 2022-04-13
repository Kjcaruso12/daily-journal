import React, { useState, useEffect } from "react";
import { EntryForm } from "./components/EntryForm";
import { EntryList } from "./components/EntryList";
import { addEntry, deleteEntry, getEntries, getEntryById, updateEntry } from "./components/EntryManager";
import { addEntryTag, getTags, getEntryTags } from "./components/tag/TagManager";
import { getMoods } from "./components/mood/MoodManager";

export const DailyJournal = () => {
  const [entries, setEntries] = useState([])
  const [moods, setMoods] = useState([])
  const [tags, setTags] = useState([])
  const [entryTags, setEntryTags] = useState([])
  const [entry, setEntry] = useState({})


  useEffect(() => {
    getAllEntries()
    getMoods().then(moodsData => setMoods(moodsData))
  }, [])

  useEffect(
    () => {
      getTags()
        .then(setTags)
    }, []
  )

  useEffect(
    () => {
      getEntryTags()
        .then(setEntryTags)
    }, []
  )

  const getAllEntries = () => {
    getEntries().then(entriesData => setEntries(entriesData))
  }

  const onEditButtonClick = (entryId) => {
    getEntryById(entryId).then(entryData => setEntry(entryData)).then(() => console.log(entry))
  }

  const onDeleteButtonClick = (entryId) => {
    deleteEntry(entryId)
      .then(getAllEntries)
  }

  const newEntryTag = (id, entryId) => {
    const entryTag = {
      entry_id: entryId,
      tag_id: id
    }
    return entryTag
  }

  const onFormSubmit = (entryData, entryTags) => {
    console.log("submit", entryData)
    if (entryData.id) {
      updateEntry(entryData).then(getAllEntries)
    } else {
      addEntry(entryData).then(getAllEntries)
    }
    setEntry({
      concept: "",
      entry: "",
      moodId: 0
    })
  }

  return (
    tags ?
      <div className="DailyJournal container">
        <div className="columns">
          <div className="column">
            <EntryForm entry={entry} moods={moods} tags={tags} onFormSubmit={onFormSubmit} />
          </div>
          <div className="column">
            <EntryList
              entries={entries}
              moods={moods}
              tags={tags}
              entryTags={entryTags}
              onEditButtonClick={onEditButtonClick}
              onDeleteButtonClick={onDeleteButtonClick}
            />
          </div>
        </div>

      </div>
      : ""
  );
};

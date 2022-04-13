import React, { useState, useEffect } from "react"

export const EntryForm = ({ entry, moods, tags, onFormSubmit }) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedEntry, setUpdatedEntry] = useState(entry)
    const [checkedTags, setCheckedTags] = useState([])
    const [checkedState, setCheckedState] = useState(
        new Array(tags?.length).fill(false)
    );
    // const tagArray = []


    useEffect(
        () => {
            setUpdatedEntry(entry)
            if ('id' in entry) {
                setEditMode(true)
            }
            else {
                setEditMode(false)
            }
        }, [entry])

    useEffect(
        () => {
            setCheckedState(new Array(tags?.length).fill(false))
        }, [tags])

    const onAddTag = (value) => {
        const list = checkedTags.concat(parseInt(value))
        setCheckedTags(list)
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState?.map((item, index) =>
            index === position ? !item : item
        )
        updatedCheckedState?.map((state, index) => {
            if (state === true & index === position) {
                const newIndex = index + 1
                onAddTag(newIndex)
            }
        })
        setCheckedState(updatedCheckedState)
    }

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = Object.assign({}, updatedEntry)
        newEntry[event.target.name] = event.target.value
        setUpdatedEntry(newEntry)
    }

    const constructNewEntry = () => {
        const copyEntry = { ...updatedEntry }
        copyEntry.moodId = parseInt(copyEntry.moodId)
        if (!copyEntry.date) {
            copyEntry.date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        }
        copyEntry.tags = checkedTags

        onFormSubmit(copyEntry)
    }

    return (
        <article className="panel is-info">
            <h2 className="panel-heading">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <div className="panel-block">
                <form style={{ width: "100%" }}>
                    <div className="field">
                        <label htmlFor="concept" className="label">Concept: </label>
                        <div className="control">
                            <input type="text" name="concept" required autoFocus className="input"
                                proptype="varchar"
                                placeholder="Concept"
                                value={updatedEntry.concept}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="entry" className="label">Entry: </label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="entry"
                                value={updatedEntry.entry}
                                onChange={handleControlledInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="tags" className="label">Tags: </label>
                        <ul className="tagBoxes">
                            {
                                tags?.map((tag, index) => {
                                    return <li className="tagCheck" key={index}>
                                        <label htmlFor={tag.subject} className="tag_label">{tag.subject} </label>
                                        <div className="control">
                                            <input
                                                type="checkbox"
                                                name={tag.subject}
                                                id={`custom-checkbox-${index}`}
                                                value={tag.id}
                                                className={tag.subject}
                                                checked={checkedState[index]}
                                                onChange={() => handleOnChange(index)}
                                            ></input>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="field">
                        <label htmlFor="moodId" className="label">Mood: </label>
                        <div className="control">
                            <div className="select">
                                <select name="moodId"
                                    proptype="int"
                                    value={updatedEntry.moodId}
                                    onChange={handleControlledInputChange}>

                                    <option value="0">Select a mood</option>
                                    {moods.map(m => (
                                        <option key={m.id} value={m.id}>
                                            {m.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructNewEntry()
                                }}
                                className="button is-link">
                                {editMode ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </article>
    )
}

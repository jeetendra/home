import React, { useEffect, useState, useRef } from 'react'
import { searchAction } from '../action/searchAction'
import { useThrottle } from '../hooks/useThrottle'
import "./Typeahead.css"

export default function Typeahead() {
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const throttledSearchTerm = useThrottle(inputValue, 300)
    const listRef = useRef(null)
    const selectedItemRef = useRef(null)

    const handleSelect = (suggestion) => {
        setInputValue(suggestion.name)
        setSuggestions([])
        setSelectedIndex(-1)
    }

    const handleKeyDown = (e) => {
        if (!suggestions.length) return

        switch(e.key) {
            case 'ArrowDown':
                setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
                e.preventDefault()
                break
            case 'ArrowUp':
                setSelectedIndex(prev => (prev > -1 ? prev - 1 : prev))
                e.preventDefault()
                break
            case 'Enter':
                if (selectedIndex > -1) {
                    handleSelect(suggestions[selectedIndex])
                }
                break
            case 'Escape':
                setSuggestions([])
                setSelectedIndex(-1)
                break
        }
    }

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (throttledSearchTerm) {
                try {
                    const data = await searchAction(throttledSearchTerm)
                    setSuggestions(data)
                } catch (error) {
                    console.error('Error fetching suggestions:', error)
                    setSuggestions([])
                }
            } else {
                setSuggestions([])
            }
        }
        fetchSuggestions()
    }, [throttledSearchTerm])

    useEffect(() => {
        if (selectedIndex >= 0 && listRef.current && selectedItemRef.current) {
            const listElement = listRef.current
            const selectedElement = selectedItemRef.current

            const listRect = listElement.getBoundingClientRect()
            const selectedRect = selectedElement.getBoundingClientRect()

            if (selectedRect.bottom > listRect.bottom) {
                selectedElement.scrollIntoView({ behavior: 'smooth', block: 'end' })
            } else if (selectedRect.top < listRect.top) {
                selectedElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }, [selectedIndex])

    return (
        <div className='typeahead'>
            <input 
                type='text' 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Search...' 
            />
            <ul className='suggestions-list' ref={listRef}>
                {suggestions.map((suggestion, index) => (
                    <li 
                        key={suggestion.id} 
                        ref={index === selectedIndex ? selectedItemRef : null}
                        className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                        onClick={() => handleSelect(suggestion)}
                        onMouseEnter={() => setSelectedIndex(index)}
                    >
                        {suggestion.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

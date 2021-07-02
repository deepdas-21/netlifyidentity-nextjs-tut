import { useContext, useEffect, useState } from 'react'
import styles from '../styles/Guides.module.css'
import AuthContext from '../stores/authContext'

export default function Guides() {
  
  const { user, authReady } = useContext(AuthContext)
  const [guides, setGuides] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (authReady) {
      fetch('/.netlify/functions/guides',user && {
        headers: {
          Authorization: 'Bearer ' + user.token.access_token
        }
      })
        .then(res => {
          if (!res.ok) {
            throw Error('You must be logged in to view this content')
          }
          return res.json()
        })
        .then(data => {
          setGuides(data)
          setError(null)
        })
        .catch(err => {
          setError(err.message)
          setGuides(null)
        })
    }
  },[user, authReady])
  
  return (
    <div className={styles.guides}>
      
      {!authReady && <div>loading...</div>}
      {error && (
        <div className={styles.error}>
          <p>{ error }</p>
        </div>
      )}
      {guides && guides.map((guide, i) => (
        <div key={i} className={styles.card}>
          <h3>{guide.title}</h3>
          <h4>Written by {guide.author}</h4>
          <p>Phasellus suscipit lorem et mi rhoncus, eu pellentesque tellus pellentesque. Cras eleifend pretium nisi, at sodales ligula congue lacinia. Praesent luctus justo quis velit posuere, ac lacinia ex rhoncus. Vivamus ut convallis ex. Proin eu libero risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec viverra leo non dolor volutpat fringilla. Vivamus nec est eget erat viverra convallis in a dolor. In consectetur neque ac suscipit ultrices. Quisque dapibus lorem sit amet malesuada dictum. Nam et blandit ex. Pellentesque pretium felis vitae...</p>
        </div>
      ))}

    </div> 
  )
}
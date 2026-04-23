import React from 'react'

const Notification = ({ notification }) => {
  if (!notification) return null

  const className = `notification ${notification.type === 'error' ? 'error' : 'success'}`

  return (
    <div className={className}>
      {notification.message}
    </div>
  )
}

export default Notification

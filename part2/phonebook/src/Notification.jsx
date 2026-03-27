
import React from 'react'

const Notification = ({ notification }) => {
  if (!notification) return null

  const { message, type } = notification
  const className = type === 'error' ? 'notification error' : 'notification success'

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification

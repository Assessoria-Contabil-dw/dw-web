'use client'

import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import {
  AlertCircle,
  AlertTriangle,
  BugIcon,
  Check,
  InfoIcon,
} from 'lucide-react'

export interface ToastMessageProps {
  message: string
  type: 'success' | 'info' | 'error' | 'warning'
}

export const displayIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <Check />
    case 'info':
      return <InfoIcon />
    case 'error':
      return <AlertCircle />
    case 'warning':
      return <AlertTriangle />
    default:
      return <BugIcon />
  }
}

const ToastMessage = ({ type, message }: ToastMessageProps) =>
  toast[type](
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>
        {message}
      </div>
    </div>,
  )

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

ToastMessage.dismiss = toast.dismiss

export default ToastMessage

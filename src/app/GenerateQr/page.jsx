import React, { useState } from 'react'
import QRCode from "qrcode.react";

const QrCode = (url) => {
  return (
    <QRCode className='w-80 h-80' value={url}/>
  )
}

export default QrCode
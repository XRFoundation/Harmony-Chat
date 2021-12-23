import React, { useState, useContext } from 'react'
import { InviteService, useInviteState } from '@xrengine/client-core/src/social/services/InviteService'
import ModeContext from '../context/modeContext'
import { useHarmonyStyles } from '../style'

interface Props {
  handleCloseModal: any
}

const Friends = (props: Props) => {
  const { handleCloseModal } = props
  const { darkMode } = useContext(ModeContext)
  const classes = useHarmonyStyles()
  const inviteState = useInviteState()
  const [userToken, setUserToken] = useState('')
  const [type, setType] = React.useState('email')

  const handleUserTokenChange = (event: any): void => {
    setUserToken(event.target.value)
  }

  const packageInvite = async (event: any): Promise<void> => {
    const mappedIDProvider = type
    event.preventDefault()
    const sendData = {
      type: 'friend',
      token: mappedIDProvider == 'email' || mappedIDProvider == 'sms' ? userToken : null,
      inviteCode: mappedIDProvider === 'code' ? userToken : null,
      identityProviderType: mappedIDProvider == 'email' || mappedIDProvider == 'sms' ? mappedIDProvider : null,
      targetObjectId: inviteState.targetObjectId.value,
      invitee: mappedIDProvider === 'friends' ? userToken : null
    }
    InviteService.sendInvite(sendData)
    setUserToken('')
    handleCloseModal()
  }

  return (
    <React.Fragment>
      <div className={`${classes.dFlex} ${classes.flexWrap} ${classes.alignCenter} ${classes.mx2}`}>
        <a
          href="#"
          onClick={() => {
            setType('email')
            setUserToken('')
          }}
          className={`${type === 'email' ? classes.bgPrimary : darkMode ? classes.border : classes.borderLight} ${
            classes.roundedCircle
          } ${classes.mx2}`}
        >
          <span>Email</span>
        </a>
        <a
          href="#"
          onClick={() => {
            setType('sms')
            setUserToken('')
          }}
          className={`${type === 'sms' ? classes.bgPrimary : darkMode ? classes.border : classes.borderLight} ${
            classes.roundedCircle
          } ${classes.mx2}`}
        >
          <span>Phone</span>
        </a>
        <a
          href="#"
          onClick={() => {
            setType('code')
            setUserToken('')
          }}
          className={`${type === 'code' ? classes.bgPrimary : darkMode ? classes.border : classes.borderLight} ${
            classes.roundedCircle
          } ${classes.mx2}`}
        >
          <span>Invite Code</span>
        </a>
      </div>
      <div className={classes.p5}>
        <form>
          {type === 'email' ? (
            <div className="form-group">
              <label htmlFor="">
                <p>Email:</p>
              </label>
              <input
                type="text"
                className={darkMode ? classes.formControls : classes.formControlsLight}
                onChange={handleUserTokenChange}
                value={userToken}
                placeholder="Your@domain.com"
              />
            </div>
          ) : type === 'sms' ? (
            <div className="form-group">
              <label htmlFor="">
                <p>Phone:</p>
              </label>
              <input
                type="text"
                onChange={handleUserTokenChange}
                value={userToken}
                className={darkMode ? classes.formControls : classes.formControlsLight}
                placeholder="078XXXXXXX"
              />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="">
                <p>Code:</p>
              </label>
              <input
                onChange={handleUserTokenChange}
                value={userToken}
                type="text"
                className={darkMode ? classes.formControls : classes.formControlsLight}
                placeholder="XXXXXX"
              />
            </div>
          )}
          <div className={`${classes.dFlex} ${classes.my2}`} style={{ width: '100%' }}>
            <button
              onClick={packageInvite}
              className={`${classes.selfEnd} ${classes.roundedCircle} ${classes.borderNone} ${classes.mx2} ${classes.bgPrimary} ${classes.cpointer} ${classes.hover}`}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Friends

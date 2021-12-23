import React, { useContext } from 'react'
import { AddCircleOutline, Check } from '@mui/icons-material'
import { Typography, Box, Tabs, Tab } from '@mui/material'
import { GroupService } from '@xrengine/client-core/src/social/services/GroupService'
import { useGroupState } from '@xrengine/client-core/src/social/services/GroupService'
import Friends from './Friends'
import Group from './Group'
import Party from './Party'
import { useHarmonyStyles } from '../style'
import ModeContext from '../context/modeContext'
import { InviteService } from '@xrengine/client-core/src/social/services/InviteService'
import { User as UserType } from '@xrengine/common/src/interfaces/User'
import { Party as PartyType } from '@xrengine/common/src/interfaces/Party'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

interface Props {
  handleCloseModal: any
  invite: string
  party: PartyType
  selfUser: UserType
}

const Index = (props: Props) => {
  const { invite, handleCloseModal } = props
  const { darkMode } = useContext(ModeContext)
  const classes = useHarmonyStyles()
  const [value, setValue] = React.useState(invite === 'Group' ? 1 : invite === 'Party' ? 2 : 0)
  const groupState = useGroupState()

  React.useEffect(() => {
    if (groupState.invitableUpdateNeeded.value === true && groupState.getInvitableGroupsInProgress.value !== true) {
      GroupService.getInvitableGroups(0)
    }
  }, [groupState.invitableUpdateNeeded.value, groupState.getInvitableGroupsInProgress.value])

  const party = props.party
  const partyUsers = party?.partyUsers?.length ? party.partyUsers : []
  let selfPartyUser
  for (const partyUser of partyUsers) {
    if (partyUser.userId === props.selfUser.id) selfPartyUser = { ...partyUser }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const updateInviteTargetType = (targetObjectType?: string, targetObjectId?: string) => {
    InviteService.updateInviteTarget(targetObjectType, targetObjectId)
  }

  return (
    <div>
      <div className={darkMode ? classes.bgModal : classes.bgModalLight} style={{ height: '60vh' }}>
        <div className={`${classes.dFlex} ${classes.alignCenter} ${classes.p5}`}>
          <AddCircleOutline />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <h1>Send Invite</h1>
        </div>
        <Box sx={{ flexGrow: 1, display: 'flex', height: 224, marginTop: 5 }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="FRIENDS" {...a11yProps(0)} onClick={() => updateInviteTargetType('user')} />
            <Tab label="GROUP" {...a11yProps(1)} onClick={() => updateInviteTargetType('group')} />
            {selfPartyUser && selfPartyUser.isOwner && (
              <Tab
                label="PARTY"
                {...a11yProps(2)}
                onClick={() => {
                  if (party?.id) {
                    updateInviteTargetType('party', party.id)
                  }
                }}
              />
            )}
          </Tabs>
          <TabPanel value={value} index={0}>
            <Friends handleCloseModal={handleCloseModal} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Group handleCloseModal={handleCloseModal} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Party handleCloseModal={handleCloseModal} />
          </TabPanel>
        </Box>
      </div>
    </div>
  )
}

export default Index

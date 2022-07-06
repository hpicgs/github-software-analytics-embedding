import React, { useEffect, useState } from 'react'
import { Button, Divider, List, ListItem, ListItemText} from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { getMetricCommits, RefsResponse } from '@/utils/github'

export default function Home() {
  const navigate = useNavigate();
  const owner = 'hpicgs'
  const repo = 'github-software-analytics-embedding'
  const [refs, setRefs] = useState<RefsResponse>();

  useEffect(() => {
    async function fetchData() {
      const refs = await getMetricCommits(owner, repo)
      console.log(refs)
      setRefs(refs)
    }
    fetchData()
  }, [])

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {refs && refs.data.map((ref) => (
        <ListItem button component={Link} to={`/${owner}/${repo}/${ref.ref.split('/').pop()}`} key={ref.ref}>
          <ListItemText primary={ref.ref} secondary={ref.object.sha} />
        </ListItem>
      ))}
    </List>
  )
}

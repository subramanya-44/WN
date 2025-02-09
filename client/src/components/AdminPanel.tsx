import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../hooks'
import AdminLogin from './AdminLogin'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
  padding: 20px;
`

const Wrapper = styled.div`
  padding: 40px;
  background: #222639;
  border-radius: 16px;
  width: 90%;
  max-width: 1200px;
  color: #eee;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`

const StatCard = styled.div`
  background: #2f3247;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  h3 {
    margin: 0;
    font-size: 16px;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    margin: 10px 0 0;
    font-size: 32px;
    font-weight: bold;
    color: #fff;
  }
`

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 40px;
  color: #fff;
  text-align: center;
`

const TableWrapper = styled(Paper)`
  background: #2f3247 !important;
  margin-top: 20px;
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  th, td {
    color: #fff !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  }

  th {
    background: rgba(0, 0, 0, 0.1);
    font-weight: 600;
  }
`

export default function AdminPanel() {
  const isAdminLoggedIn = useAppSelector((state) => state.admin.isAdminLoggedIn)
  const rooms = useAppSelector((state) => state.room.availableRooms)
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeRooms: 0,
    totalMessages: 0,
  })

  useEffect(() => {
    if (isAdminLoggedIn) {
      // Update stats periodically
      const interval = setInterval(() => {
        setStats({
          totalUsers: rooms.reduce((acc, room) => acc + room.clients, 0),
          activeRooms: rooms.length,
          totalMessages: 0, // You can implement message counting if needed
        })
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isAdminLoggedIn, rooms])

  if (!isAdminLoggedIn) {
    return (
      <PageWrapper>
        <AdminLogin />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Wrapper>
        <Title>Admin Dashboard</Title>
        <StatsGrid>
          <StatCard>
            <h3>Total Users Online</h3>
            <p>{stats.totalUsers}</p>
          </StatCard>
          <StatCard>
            <h3>Active Rooms</h3>
            <p>{stats.activeRooms}</p>
          </StatCard>
          <StatCard>
            <h3>Total Messages</h3>
            <p>{stats.totalMessages}</p>
          </StatCard>
        </StatsGrid>

        <Title style={{ fontSize: '24px', marginBottom: '20px' }}>Active Rooms</Title>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Users</TableCell>
                <TableCell align="center">Private</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.roomId}>
                  <TableCell>{room.metadata.name}</TableCell>
                  <TableCell>{room.metadata.description}</TableCell>
                  <TableCell align="center">{room.clients}</TableCell>
                  <TableCell align="center">
                    {room.metadata.hasPassword ? 'Yes' : 'No'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Wrapper>
    </PageWrapper>
  )
}
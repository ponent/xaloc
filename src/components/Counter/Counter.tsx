import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../hooks'

import { decrement, increment, fetchUserById } from '../../store/counter/counterSlice'
import { RootState } from '../../store'
import { Button, Loader } from '@mantine/core'

export const Counter = () => {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state: RootState) => state.counter)
  const dispatch = useAppDispatch()

  const getRandomInt = (max: number) : number => Math.floor(Math.random() * max)

  const userComponent = <span>User: {count.user.id} ({count.user.username}) </span>
  const loading = count.loading?<Loader />:<></>
  return (
      <>
        <p>
            Counter: {count.value}
        </p>
        <p>{count.user.id !== -1 && !count.loading ? userComponent : <></>}{loading}</p>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(fetchUserById(getRandomInt(9999)))}>FETCH!</Button>
      </>
  )
}
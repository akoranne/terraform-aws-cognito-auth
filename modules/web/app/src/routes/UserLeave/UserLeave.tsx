/*
 * Copyright (c) 2018 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import { CircularProgress } from "@material-ui/core"
import * as React from "react"
import {
  branch,
  compose,
  lifecycle,
  pure,
  renderComponent
} from "recompose"

import { UserLeaveRequest } from "common"
import {
  WithFormSubmit,
  withFormSubmit
} from "enhancers"

import { UserLeaveRedirect } from "./UserLeaveRedirect"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Render properties
 */
export type RenderProps =
  & WithFormSubmit<UserLeaveRequest>

/* ----------------------------------------------------------------------------
 * Presentational component
 * ------------------------------------------------------------------------- */

/**
 * Render component
 *
 * @return JSX element
 */
export const Render: React.SFC<RenderProps> =
  () => <CircularProgress />

/* ----------------------------------------------------------------------------
 * Enhanced component
 * ------------------------------------------------------------------------- */

/**
 * User sign out component
 */
export const UserLeave =
  compose<RenderProps, {}>(
    withFormSubmit<UserLeaveRequest>({
      message: "You signed out of your account",
      secured: true
    }),
    lifecycle<RenderProps, {}>({
      async componentDidMount() {
        const { submit } = this.props
        await submit()
      }
    }),
    branch<WithFormSubmit<UserLeaveRequest>>(
      ({ form }) => form.success || !!form.err,
      renderComponent(UserLeaveRedirect)
    ),
    pure
  )(Render)
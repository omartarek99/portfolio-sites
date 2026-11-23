'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  /** Shown instead of the block when it throws. Live sites pass nothing. */
  fallback?: ReactNode
  /** Identifies the block in logs. */
  label?: string
  children: ReactNode
}

interface State {
  failed: boolean
}

/**
 * Error boundary around every block (SPEC §15): a broken block renders
 * nothing instead of breaking the page. The editor passes a visible fallback
 * so the user can select and remove the broken section.
 */
export class BlockBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(`[block] ${this.props.label ?? 'A block'} failed to render:`, error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}

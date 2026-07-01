'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface DeleteItemButtonProps {
  sectionKey: string
  slug: string
  displayName: string
  deleteAction: (sectionKey: string, slug: string) => Promise<void>
}

export default function DeleteItemButton({
  sectionKey,
  slug,
  displayName,
  deleteAction,
}: DeleteItemButtonProps) {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteAction(sectionKey, slug)
        toast.success(`Deleted "${displayName}"`)
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to delete')
      } finally {
        setConfirming(false)
      }
    })
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium disabled:opacity-50"
        >
          {isPending ? '…' : 'Delete'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-2 py-1.5 rounded text-xs font-medium transition-colors"
    >
      Delete
    </button>
  )
}

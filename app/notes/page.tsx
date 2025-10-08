"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit2, Save, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
}

export default function NotesPage() {
  const { t } = useLanguage()
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome Note",
      content: "This is your notes page. You can add, edit, and delete notes here.",
      createdAt: new Date(),
    },
  ])
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")

  const addNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return

    const note: Note = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      createdAt: new Date(),
    }

    setNotes([note, ...notes])
    setNewTitle("")
    setNewContent("")
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const startEdit = (note: Note) => {
    setEditingId(note.id)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const saveEdit = () => {
    if (!editTitle.trim() || !editContent.trim()) return

    setNotes(notes.map((note) => (note.id === editingId ? { ...note, title: editTitle, content: editContent } : note)))
    setEditingId(null)
    setEditTitle("")
    setEditContent("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
    setEditContent("")
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Notes</h1>

          {/* Add New Note */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Note</CardTitle>
              <CardDescription>Create a new note to save your thoughts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Note title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              <Textarea
                placeholder="Note content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
              />
              <Button onClick={addNote} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </CardContent>
          </Card>

          {/* Notes List */}
          <div className="space-y-4">
            {notes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  {editingId === note.id ? (
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="text-xl font-semibold"
                    />
                  ) : (
                    <CardTitle>{note.title}</CardTitle>
                  )}
                  <CardDescription>
                    {note.createdAt.toLocaleDateString()} at {note.createdAt.toLocaleTimeString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {editingId === note.id ? (
                    <div className="space-y-4">
                      <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={4} />
                      <div className="flex gap-2">
                        <Button onClick={saveEdit} size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={cancelEdit} variant="outline" size="sm">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-muted-foreground whitespace-pre-wrap mb-4">{note.content}</p>
                      <div className="flex gap-2">
                        <Button onClick={() => startEdit(note)} variant="outline" size="sm">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button onClick={() => deleteNote(note.id)} variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

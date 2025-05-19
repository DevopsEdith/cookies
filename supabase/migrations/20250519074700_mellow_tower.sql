/*
  # Tracking Events Schema

  1. New Tables
    - `tracking_events`
      - `id` (uuid, primary key)
      - `tracking_id` (text, not null) - The tracking ID from the script
      - `event_type` (text, not null) - Type of event (pageview, product_click, etc.)
      - `event_data` (jsonb) - Event-specific data
      - `user_id` (uuid) - Reference to auth.users if authenticated
      - `session_id` (text) - For tracking user sessions
      - `created_at` (timestamptz)
      - `ip_address` (text)
      - `user_agent` (text)

  2. Security
    - Enable RLS on tracking_events table
    - Add policies for inserting and reading events
*/

-- Create tracking_events table
CREATE TABLE IF NOT EXISTS tracking_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id text NOT NULL,
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  user_id uuid REFERENCES auth.users(id),
  session_id text,
  created_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Enable RLS
ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting events
CREATE POLICY "Anyone can insert events"
  ON tracking_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reading own events
CREATE POLICY "Users can read own events"
  ON tracking_events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_tracking_events_tracking_id ON tracking_events(tracking_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_event_type ON tracking_events(event_type);
CREATE INDEX IF NOT EXISTS idx_tracking_events_created_at ON tracking_events(created_at);
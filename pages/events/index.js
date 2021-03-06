import Head from "next/head";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Layout.module.css";
import { API_URL } from "@/config/index";

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1> Events</h1>
      {events.length === 0 && <h3>NO EVENTS TO SHOW </h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}></EventItem>
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}




export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  console.log(res)
  const events = await res.json();

  return {
    props: { events:events.slice(0,3) },
    revalidate: 1,
  };
}

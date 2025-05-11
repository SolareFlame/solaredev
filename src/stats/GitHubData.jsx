import React, { useEffect, useState } from 'react';
import CountUp from "../blocks/TextAnimations/CountUp/CountUp.jsx";

const GithubData= ({ username }) => {
    const [totalCommits, setTotalCommits] = useState(0);

    const year = new Date().getFullYear();
    const date = `${year}-01-01T00:00:00Z`;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
                },
                body: JSON.stringify({
                    query: `
            {
              user(login: "${username}") {
                contributionsCollection(from: "${date}") {
                  contributionCalendar {
                    totalContributions
                  }
                }
              }
            }
          `,
                }),
            });

            const json = await res.json();
            const total = json.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;
            setTotalCommits(total);
        };

        fetchData();
    }, [username]);

    return (
        <CountUp
            from={0}
            to={totalCommits}
            separator=","
            direction="up"
            duration={1}
            className="text-[48px] font-semibold"
        />
    );
};

export default GithubData;

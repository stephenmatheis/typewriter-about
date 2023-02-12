import Link from 'next/link';
import Type from '@/components/type/type';
import jobs from '@/data/jobs';
import skills from '@/data/skills';
import styles from './main.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export default function Main({ type, speed, showLinkBackground, setShowLinkBackground }) {
    const curentYear = new Date().getFullYear();


    // TODO: Trigger link background on all animation end (make it the last thing to load)
    useEffect(() => {
        const longestLineLength = Math.max(
            ...jobs
                .flatMap(({ lines }) => lines)
                .map(line => line.length)
        );

        console.log(longestLineLength);

        setTimeout(() => {
            setShowLinkBackground(true);
        }, (longestLineLength + 10) * (speed / 4));
    }, [speed, showLinkBackground, setShowLinkBackground]);

    return (
        <main className={classNames(styles['main'], { [styles['link-background']]: showLinkBackground })}>
            {/* Left */}
            <section className={styles['left']}>
                <div id={styles['experience']}>
                    <div className={styles['comment']}>
                        <Type content={'// Experience'} speed={speed / 2} />
                    </div>
                    {
                        jobs.map(({ title, company, location, start, end, lines }, index) => {
                            return (
                                <div key={index} className={styles['job']}>
                                    <div className={styles['title']}>
                                        {type ? <Type content={title} speed={speed / 2} /> : <span>{title}</span>}
                                        <span> </span>
                                        {type ? <Type content={`@ ${company}`} speed={speed / 2} className={styles['company']} /> : <span className={styles['company']}>@ {company}</span>}
                                    </div>
                                    <div className="date">
                                        {
                                            type ?
                                                <>
                                                    <Type content={`${start} - ${end} `} speed={speed / 2} className={styles['date']} />
                                                    <Type content={'| '} speed={speed} />
                                                    <Type content={location} speed={speed / 2} />
                                                    <span></span>
                                                </> :
                                                <>
                                                    {start} - {end} | {location}
                                                </>
                                        }
                                    </div>
                                    <div className={styles['lines']}>
                                        {lines.map((line, index) => {
                                            return (
                                                <span key={index} className={styles['line']}>
                                                    <span style={{ marginRight: '6px' }} >❯</span>
                                                    {
                                                        type ?
                                                            <>
                                                                <Type content={line} speed={speed / 6} />
                                                            </> :
                                                            <>
                                                                <span dangerouslySetInnerHTML={{ __html: line }} />
                                                            </>
                                                    }
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            {/* Right */}
            <section className={styles['right']}>
                <div id={styles['skills']}>
                    <div className={styles['comment']}>
                        <Type content={'// Skills'} speed={speed} />
                    </div>
                    {
                        skills.map(({ name, started }, index) => {
                            const years = (curentYear - started || 1);

                            return (
                                <div key={index} className={styles['skill']}>
                                    <span className={styles['name']}>
                                        {type ? <Type content={name} speed={speed} /> : name}
                                    </span>
                                    <span className={styles['years']}>
                                        {
                                            type ?
                                                <Type content={`${years} ${parseInt(years) === 1 ? 'year' : 'years'}`} speed={speed} /> :
                                                <>
                                                    {years} {parseInt(years) === 1 ? 'year' : 'years'}
                                                </>
                                        }
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
                {/* Education */}
                <div id={styles['education']}>
                    <div className={styles['comment']}>
                        <Type content={'// Education'} speed={speed / 2} />
                    </div>
                    <div className={styles['college']}>
                        <Type content="Armstrong Atlantic State University" speed={speed / 2} />
                    </div>
                    <div className={styles['major']}>
                        {
                            type ?
                                <>
                                    <Type content="2006 - 2007 " speed={speed} className={styles['date']} />
                                    <Type content={'| '} speed={speed} />
                                    <Type content="Computer Science" speed={speed} />
                                    <span></span>
                                </>
                                :
                                <>
                                    <span>2006 - 2007</span>
                                    <span> | Computer Science</span>
                                </>
                        }
                    </div>
                </div>
                {/* Contact */}
                <div id={styles['contact']}>
                    <div className={styles['comment']}>
                        <Type content={'// Contact'} speed={speed / 2} />
                    </div>
                    <div className={styles['info']}>
                        <div className={styles['link-ctr']}>
                            <Link href="tel:9124922522" aria-label="My phone number">
                                <span className={styles['emoji']}>📱</span>
                                <Type content="(912) 492-2522" speed={speed * 2 / 3} className={styles['link-text']} />
                            </Link>
                        </div>
                        <div className={styles['link-ctr']}>
                            <Link href="mailto:stephen.a.matheis@gmail.com" aria-label="My email address">
                                <span className={styles['emoji']}>📧</span>
                                <Type content="stephen.a.matheis@gmail.com" speed={speed / 2} className={styles['link-text']} />
                            </Link>
                        </div>
                        <div className={styles['link-ctr']}>

                            <Link href="https://github.com/stephenmatheis" target="_blank" rel="noreferrer" title='GitHub' aria-label="My GitHub profile">
                                <span className={styles['emoji']}>👩‍💻</span>
                                <Type content="github.com/stephenmatheis" speed={speed / 2} className={styles['link-text']} />
                            </Link>
                        </div>
                        <div className={styles['link-ctr']}>
                            <Link href="https://www.linkedin.com/in/stephenmatheis/" target="_blank" rel="noreferrer" title='LinkedIn' aria-label="My LinkedIn profile">
                                <span className={styles['emoji']}>💼</span>
                                <Type content="linkedin.com/in/stephenmatheis" speed={speed / 2} className={styles['link-text']} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
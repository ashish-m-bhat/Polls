'use client';
import { Poll } from '@/utils/types';
import styles from '../../styles/ListPolls.module.css';
import DisplayPoll from './DisplayPoll';

function ListPolls({ pollsList }: { pollsList: Poll[] }) {
    return (
        <div>
            <div className={styles.polls}>
                {
                    pollsList.map((poll, index) => {
                        if (!poll.isActive) return <></>;
                        return (
                            <DisplayPoll poll={poll} index={index} key={poll.id} />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ListPolls;

import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function CastVote() {

    const [hasVoted, setHasVoted] = useState(false);
    const [candidateId, setCandidateId] = useState();
    const [candidates, setCandidates] = useState([]);
    const {electionId} = useParams();

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const response = await api.get(`/elections/${electionId}/candidates`);
                setCandidates(response.data);
            }
            catch (err) {
                console.error(err);
                toast.error("Failed to load candidates");
            }
        }

        getCandidates();

    }, [electionId]);


    useEffect(() => {

        const checkVote = async () => {
            try {
                const response = await api.get(
                    `/votes/elections/${electionId}/has-voted`
                );
                setHasVoted(response.data.hasVoted);
            } catch (err) {
                console.error(err);
                toast.error("Error in checking voting status");
            }
        }

        checkVote();

    }, [electionId]);


    const handleVote = async (e) => {
        e.preventDefault();
        if (!candidateId) {
            toast.error("Please select a candidate");
        }

        try {
            await api.post("/votes", {
                electionId,
                candidateId
            });

            setHasVoted(true);
            toast.success("Vote cast successfull");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data || "Error in casting vote");
        }
    };

    if (hasVoted) {
        return <h3>You have already voted for the election</h3>
    }

    return (
        <React.Fragment>
            <form onSubmit={handleVote}>

                <h2>Cast your vote</h2>

                <select
                    required
                    onChange={(e) => setCandidateId(e.target.value)}
                    value={candidateId}>
                    <option value=""> Select Candidate </option>
                    {
                        
                            candidates.map((candidate) => (
                                <option
                                    key={candidate.candidateId}
                                    value={candidate.candidateId}
                                >
                                    {candidate.candidateName}
                                </option>
                            ))
                        
                    }
                </select>

                <button type="submit">Cast Vote</button>


            </form>
        </React.Fragment>
    )
}

export default CastVote
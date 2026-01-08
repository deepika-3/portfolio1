import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'


function App() {
const [resume, setResume] = useState([])


useEffect(() => {
fetchResume()
}, [])


async function fetchResume() {
const { data, error } = await supabase
.from('resume')
.select('*')


if (error) {
console.error(error)
} else {
setResume(data)
}
}


return (
<div style={{ padding: '20px' }}>
<h1>My Resume</h1>


{resume.length === 0 && <p>No data found</p>}


{resume.map((item) => (
<div key={item.resume_id}>
<h2>{item.full_name}</h2>
<p>{item.professional_summary}</p>
</div>
))}
</div>
)
}
export default App
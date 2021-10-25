import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { ipAtom } from '../../state/state';

const Performance = () => {
  const title = 'Performance';
  const [deps, setDeps] = useState([])
  const [curDep, setCurDep] = useState('')

  useEffect(async () => {
    let token = localStorage.getItem("pepcoding_token");
    try {
      let data = await axios.get(`${ip}/api/department`,
        {
          'headers': { 'Authorization': `Bearer ${token}` }
        });
      if (data.data.success == 2) {
        // throw new Error("Server Error, No departments found")
        localStorage.setItem("pepcoding_token", null);
        router.push('/Login')
      }
      if (data.data.success == 0) throw new Error("Server Error, No departments found")
      console.log(data.data.data)
      setDeps(data.data.data)
    } catch (err) {
      console.log("Error" + err)
    }
  }, [])
  useEffect(() => {
    if (deps.length > 0) {
      setCurDep(deps[0].name)
    }
  }, [deps])
  useEffect(async () => {
    let url = await axios.get(`${ip}/api/performance`)
    seturl(url.data.data)
  }, [])
  const ip = useRecoilValue(ipAtom);
  const [url, seturl] = useState(initialState)
  return (
    <>
      <div className="flex flex-col flex-wrap sm:flex-row">
        <iframe
          src={url}
          frameborder="0"
          width="800"
          height="600"
          allowtransparency
        ></iframe>
      </div>
    </>
  )
}

export default Performance
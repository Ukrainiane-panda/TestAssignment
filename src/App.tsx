import { useState, useEffect } from 'react';
import { Banner } from './components/Banner';
import { Header } from './components/Header';
import { WorkingWithGETrequest } from './components/WorkingWithGETrequest';
import { client } from './utils/fetchClient';
import { User } from './type/User';

import './style/main.scss'
import { WorkingWithPOSTrequest } from './components/WorkingWithPOSTrequest';
import { Position } from './type/Position';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    fetchUsers();

    fetchPositions();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const response = await client.getUsers(page, 6);
      setIsLoading(false);

      if (response.success) {
        setUsers(prevUsers => (
          page === 1 
            ? response.users 
            : [...prevUsers, ...response.users]
        ));
  
        setShowMoreButton(page < response.total_pages);
      } else {
        console.error('Failed to fetch users:', response);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
  };
  

  const fetchPositions = async () => {
    try {
      const response = await client.getPositions();

      if (response.success) {
        setPositions(response.positions);
      } else {
        console.error('Failed to fetch positions:', response);
      }
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
 
  useEffect(() => {
    if (page > 1) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
   

  console.log(showMoreButton, positions);

  return (
    <div>
      <Header />
      <main>
        <Banner />
        {showMoreButton 
          && <WorkingWithGETrequest 
              users={users} 
              onShow={handleShowMore} 
              isLoading={isLoading} 
            />
            }
        <WorkingWithPOSTrequest positions={positions} />       
      </main>   
    </div>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.css';
import { UserProvider } from '@/context/userContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import TopNav from '@/components/TopNav';

export default function App({ Component, pageProps }) {
    return(
        <UserProvider>
            <TopNav/>
            <Component {...pageProps} />
        </UserProvider>
        
         )
  }
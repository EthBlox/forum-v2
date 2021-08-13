import { useRouter } from 'next/router';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import NFTConvo from '../../../components/NFTConvo';

const Comment = (props) => {
  const router = useRouter()
  const { id, comment } = router.query

  return (
    <>
      <Header />
      <NFTConvo desc={props}/>
      <Footer />
    </>
  )
}

export default Comment;




export async function getServerSideProps(context) {
  console.log(context.query) 
  // returns { id: episode.itunes.episode, title: episode.title}
  

  //you can make DB queries using the data in context.query
  return {
      props: { 
        image_url: context.query.image_url, //pass it to the page props
        name: context.query.name,
        id: context.query.id,
        comment: context.query.comment
      }
  }
};
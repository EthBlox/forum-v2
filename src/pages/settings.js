import { useState, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import {
  client,
  getRecord
} from '../../utils/identity';
import {
  Card, 
  H5, 
  Body2, 
  CardHeader, 
  CardContent, 
  CardAction,
  Button,
  Avatar,
  TextField ,
} from 'ui-neumorphism';




const useStyles = makeStyles((theme) => ({
  btnContainer: {
    margin: "0px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: "15%"
  },
  loginBtn: {
    padding: "5%", 
    width: "12vw",
    fontSize: "1.5rem",
    marginRight: "2vw",
    marginLeft: "2vw",
    overflow: "hidden",
  },
  flexContainer: {
    display: "flex",
  },
}));

export default function Settings() {
  const [bio, setBio] = useState('');
  const [twitter, setTwitter] = useState('');
  const [name, setName] = useState('');
  const [pfp, setPfp] = useState('');
  const [profile, setProfile] = useState({});
  const [localDid, setDid] = useState(null);
  const [idxInstance, setIdxInstance] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [editing, setEditing] = useState(false);
  const idxRef = useRef(null);
  const didRef = useRef(null);

  // access reference val
  idxRef.current = idxInstance;
  didRef.current = localDid;

  const classes = useStyles();


   const connect = async () => {
    const cdata = await client();
    const { did, idx, error } = cdata;
    if (error) {
      console.log('error: ', error)
      return
    };
    setDid(did);
    setIdxInstance(idx);
    // default aliases
    const data = await idx.get('basicProfile', did.id);
    if (data) {
      setProfile(data);
      setShowGreeting(false);
    } else {
      setShowGreeting(true);
    }
    setLoaded(true);
  };

  const updateProfile = async () => {
    console.log('updating...');
    if (!twitter && !bio && !name) {
      console.log('error... no profile information submitted');
      return
    };
    if (!idxInstance) {
      await connect();
    };
    const user = {...profile};
    if (twitter) user.twitter = twitter;
    if (bio) user.bio = bio;
    if (name) user.name = name;
    if (pfp) user.pfp = pfp;
    await idxRef.current.set('basicProfile', user);
    setLocalProfileData();
    console.log('profile updated...');
    setEditing(false);
  };

  const readProfile = async () => {
    try {
      const { record } = await getRecord();
      if (record) {
        setProfile(record);
      }
    } catch (error) {
      setShowGreeting(true);
    }
    setLoaded(true);
  };

  const setLocalProfileData = async () => {
    try {
      const data = await idxRef.current.get('basicProfile', didRef.current.id);
      if (!data) return
      setProfile(data);
      setShowGreeting(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const editHandler = async () => {
    console.log('editing..')
    setEditing(!editing);
    return (
      <>
        <h1>Editing</h1>
      </>
    );
  };

  return (
    <>
        <Header />

        <div style={{ paddingTop: 50, width: 500, margin: '0 auto', display: 'flex', flex: 1, marginBottom:"38vh" }}>
          <div className="flex flex-1 flex-col justify-center">
            {
              Object.keys(profile).length ? (
                  <>
                  { !editing && (
                  <>
                    <div className={classes.flexContainer}>
                      <h2>Profile Settings</h2>
                      {/* <TextField
                        label={caddress}
                        rounded
                        readonly
                        className='my-3'
                      ></TextField> */}
                    </div>
                    <Card rounded minHeight="400" minWidth="600">
                      <CardContent>
                        <CardHeader 
                        secondary style={{ marginBottom: '4px' }} 
                        avatar={
                          <Avatar 
                            alt="Ankit Kumar Pandit"
                            src='https://lh3.googleusercontent.com/a-/AAuE7mBL0Hh_wKgNlXtZks9XqIU3uv-j3COoKuYysLS_Svg'
                            size={60}
                          />
                        }
                        title={profile.name}
                        >
                        </CardHeader>
                        <Body2 style={{marginTop: '50px', marginLeft: '20px'}}>
                          Bio:
                          <TextField 
                            secondary 
                            style={{ marginBottom: '12px' }} 
                            label={profile.bio} 
                            autoExpand="false"
                            readonly
                          >
                          </TextField>
                          <br />
                          Twitter handle:
                          <TextField  
                            secondary 
                            style={{ marginBottom: '12px' }} 
                            label={profile.twitter} 
                            autoExpand="false" 
                            readonly
                          >
                          </TextField>
                        </Body2>
                      </CardContent>
                      <CardAction style={{marginTop: '50px', marginLeft: '20px'}}>
                        <Button text color='#ad14f2' onClick = {editHandler}>
                          Edit
                        </Button>
                      </CardAction>
                    </Card>
                  </>
                  ) }
                </> 
                


              ) : null
            }

          {
            !loaded && (
              <>
                
                <h3>Authenticate yourself to access your profile</h3>
                <div className={classes.btnContainer} >
                  <Button onClick={connect} color='#00AEE9' size='large' className={classes.loginBtn}>Login</Button>

                  <Button onClick={readProfile} color='#00AEE9' size='large' className={classes.loginBtn} >View Profile</Button>
                </div>
            </>
            )
          }
          {
            loaded && showGreeting && (
              <>
                <p className="my-4 font-bold text-center">You have no profile yet. Please create one!</p>
                <Button onClick={connect} color='#00AEE9' size='large' className={classes.loginBtn}>Login</Button>
              </>
            )
          }
          {
            loaded && !showGreeting && editing && (
              <>
                    <h2>Update Profile</h2>
                    <Card rounded minHeight="400" minWidth="600">
                      <CardContent>
                        <CardHeader 
                        secondary style={{ marginBottom: '4px' }} 
                        avatar={
                          <Avatar 
                            alt="Ankit Kumar Pandit"
                            src='https://lh3.googleusercontent.com/a-/AAuE7mBL0Hh_wKgNlXtZks9XqIU3uv-j3COoKuYysLS_Svg'
                            size={60}
                          />
                        }
                        >
                        </CardHeader>
                        <Body2 style={{marginTop: '50px', marginLeft: '20px'}}>
                          Username:
                          <TextField 
                            secondary 
                            style={{ marginBottom: '12px' }} 
                            autoExpand="false"
                            value={profile.name}
                            onChange={e => setName(e.value)}
                          >
                          </TextField>
                          Bio:
                          <TextField 
                            secondary 
                            style={{ marginBottom: '12px' }} 
                            autoExpand="false"
                            value={profile.bio}
                            onChange={e => setBio(e.value)}
                          >
                          </TextField>
                          <br />
                          Twitter handle:
                          <TextField  
                            secondary 
                            style={{ marginBottom: '12px' }} 
                            autoExpand="false" 
                            value={profile.twitter}
                            onChange={e => setTwitter(e.value)}
                          >
                          </TextField>
                        </Body2>
                      </CardContent>
                      <CardAction style={{marginTop: '50px', marginLeft: '20px'}}>
                        <Button text color='#ad14f2' onClick = {updateProfile}>
                          Update Profile
                        </Button>
                        <Button text color='#ad14f2' onClick = {editHandler}>
                          Reset Changes
                        </Button>
                      </CardAction>
                    </Card>
              </>
            )
          }
          </div>
        </div>
      <Footer />
    </>
  )
}
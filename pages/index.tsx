import Layout from '@/components/Layout'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Product, RootObject } from '@/typing'
import { Tab, Tabs, useTheme } from '@mui/material'
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { Router, useRouter } from 'next/router';


interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
interface Props {
  items: RootObject
}
export default function Home({ items }: Props) {
  const theme = useTheme();
  const { data: session } = useSession()
  const route = useRouter()

  const count = useSelector((state: RootState) => state.counter.value)
  const [product, SetProduct] = useState<Product[]>([]);
  const dispatch = useDispatch()

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };


  useEffect(() => {
    // if (!session?.user) {
    //   route.push('/login')
    // }
    
    if (items) {
      SetProduct(items.products)
    }
    
  }, [product,session])

  return (
    <Layout title='Home'>
      <Box >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={value} index={0} dir={theme.direction}>
          
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </Box>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch('https://dummyjson.com/products');
  const product: RootObject = await res.json();
  return {
    props: {
      items: product
    }
  }
}



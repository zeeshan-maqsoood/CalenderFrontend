import React from 'react';

import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useDispatch } from 'react-redux';
import { setSideBarValue } from '../Redux/EventsSlice';
const NavSidebar = ({ setView }) => {
  const dispatch=useDispatch()
  const login = JSON.parse(localStorage.getItem('loginUser'));
 
  return (
    <>
      {login ? (
        <>
          <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({ itemId }) => {
             
              dispatch(setSideBarValue(itemId))
              if (
                itemId === 'calenderview' ||
                itemId === 'privatecalenderview'
              ) {
                setView(true);
              } else if (
                itemId === 'calenderlistview' ||
                itemId === 'privatelistview'
              ) {
                setView(false);
              }
              // maybe push to the route
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                // elemBefore: () => <Icon name="inbox" />,
              },
              {
                title: 'Public Events',
                itemId: 'public',
                // elemBefore: () => <Icon name="users" />,
                subNav: [
                  {
                    title: 'CalenderView',
                    itemId: 'calenderview',
                  },
                  {
                    title: 'List View',
                    itemId: 'calenderlistview',
                  },
                ],
              },
              {
                title: 'Private Events',
                itemId: '/Private',
                subNav: [
                  {
                    title: 'Calender View',
                    itemId: 'privatecalenderview',
                  },
                  {
                    title: 'List View',
                    itemId: 'privatelistview',
                  },
                ],
              },
            ]}
          />
        </>
      ) : (
        <>
          <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({ itemId }) => {
              console.log(itemId, 'itemId');
              if (
                itemId === 'calenderview' ||
                itemId === 'privatecalenderview'
              ) {
                setView(true);
              } else if (
                itemId === 'calenderlistview' ||
                itemId === 'privatelistview'
              ) {
                setView(false);
              }
              // maybe push to the route
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                // elemBefore: () => <Icon name="inbox" />,
              },
              {
                title: 'Public Events',
                itemId: 'public',
                // elemBefore: () => <Icon name="users" />,
                subNav: [
                  {
                    title: 'CalenderView',
                    itemId: 'calenderview',
                  },
                  {
                    title: 'List View',
                    itemId: 'calenderlistview',
                  },
                ],
              },
            ]}
          />
        </>
      )}
    </>
  );
};
export default NavSidebar;

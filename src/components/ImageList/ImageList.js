import {Box, ImageList, ImageListItem, ClickAwayListener  } from '@mui/material';

function ProfilePictureList (props){
    const {value,set, close} = props
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 450,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const itemData = [
        {
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQedmDoj-UygYzhlijDJa-yxwTcRHV1ApZxSg&usqp=CAU',
            title: 'Zappa',
        },
        {
            img: 'https://media.timeout.com/images/105904598/750/422/image.jpg',
            title: 'Marcus',
        },
        {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg/640px-Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg',
            title: 'Freddy',
        },
        {
            img: 'https://dynamicmedia.livenationinternational.com/Media/h/p/w/2b645d6f-c3d4-48ea-9de7-56e913d96969.jpg',
            title: 'Thundercat',
        },
        {
            img: 'https://www.clarin.com/img/2020/09/24/hace-40-anos-moria-de___zVt-M4TfQ_340x340__1.jpg',
            title: 'Bonham',
        },
        {
            img: 'https://miro.medium.com/max/1400/1*I5zBA2Wix6OSrOS25ZLr_Q.jpeg',
            title: 'Thelonious',
        },
        {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/JohnLeeHooker1997.jpg/800px-JohnLeeHooker1997.jpg',
            title: 'Hooker',
        },
        {
            img: 'https://scherzo.es/wp-content/uploads/2022/05/377-JAZZ-MilesDavis.jpg',
            title: 'Miles',
        },
        {
            img: 'https://www.biografiasyvidas.com/biografia/b/fotos/baker_chet.jpg',
            title: 'Chet',
        },
        {
            img: 'https://i.ytimg.com/vi/RT39bmZ-vaw/sddefault.jpg',
            title: 'Louis',
        },
    ]

    return(
            <ClickAwayListener onClickAway={close}>
            <ImageList cols={3} rowHeight={164} sx={{ ...style}}>
            {itemData.map((item) => (
                <ImageListItem key={item.img} onClick={()=>{
                    set(item.img)
                    close()
                }}>
                <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                />
                </ImageListItem>
            ))}
            </ImageList>
            </ClickAwayListener>
    )

}

export default ProfilePictureList
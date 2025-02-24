import BoxJas from "../BoxJas/BoxJas"

export interface EmptyPageProps {
    titlepage?: string | React.ReactNode,
    titleheader?: string | React.ReactNode ,
    descriptionheader?: string | React.ReactNode ,

    titlenav?: string | React.ReactNode ,
    descriptionnav?: string | React.ReactNode ,

    titlemain?: string | React.ReactNode ,
    descriptionmain?: string | React.ReactNode ,
    children?: React.ReactNode,
}

const EmptyPage: React.FC<EmptyPageProps> = ({titlepage, titleheader, descriptionheader, titlenav, descriptionnav, titlemain, descriptionmain, children }) => {
    return (
        <div style={{
            backgroundColor: "var(--color3)",
            padding: "10px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <BoxJas
                title={
                    titlepage
                   }
                description={
                    <>
                     <BoxJas
                        title={titleheader}
                        description={descriptionheader}
                    />
                        <BoxJas title={titlenav} description={descriptionnav} />
                        <BoxJas title={titlemain} description={descriptionmain} />
                    </>
                } />
                {children}
        </div>
    )
};
export default EmptyPage;
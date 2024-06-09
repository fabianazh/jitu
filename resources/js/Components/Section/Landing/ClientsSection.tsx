import HarvardIcon from '@/Assets/Img/Icon/harvard.png'
import OxfordIcon from '@/Assets/Img/Icon/oxford.png'
import MITIcon from '@/Assets/Img/Icon/mit.png'
import UGMIcon from '@/Assets/Img/Icon/ugm.png'
import PasimIcon from '@/Assets/Img/Icon/smk-pasim.png'
import UnibrawIcon from '@/Assets/Img/Icon/unibraw.png'
import SUIcon from '@/Assets/Img/Icon/su.png'

export default function ClientsSection() {
    const icons = [
        {
            imgPath: HarvardIcon,
            altText: 'Harvard Icon',
            style: 'h-9 lg:h-12 w-fit mb-2 lg:mb-0 grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer',
        },
        {
            imgPath: OxfordIcon,
            altText: 'Oxford Icon',
            style: 'h-10 lg:h-12 w-fit mb-2 lg:mb-0 grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer',
        },
        {
            imgPath: MITIcon,
            altText: 'MIT Icon',
            style: 'h-20 lg:h-24 w-fit grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer',
        },
        {
            imgPath: SUIcon,
            altText: 'Stanford Icon',
            style: 'h-[4.5rem] lg:h-[5.5rem] w-fit grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer',
        },
        {
            imgPath: UGMIcon,
            altText: 'UGM Icon',
            style: 'h-16 lg:h-20 w-fit mb-4 lg:mb-0 grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer',
        },
        {
            imgPath: UnibrawIcon,
            altText: 'Unibraw Icon',
            style: 'h-10 lg:h-12 w-fit mb-4 lg:mb-0 grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer',
        },
        {
            imgPath: PasimIcon,
            altText: 'Pasim Icon',
            style: 'h-12 lg:h-16 w-fit grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer',
        },
    ]
    return (
        <section
            id="client"
            className="w-full items-center flex mt-14 lg:mt-24 flex-col gap-4 h-auto px-8 mx-auto relative"
        >
            <span className="block text-base font-semibold text-center">
                Sejak <span className="text-blue-700">2006, </span> Kami telah
                bermitra dengan beberapa{' '}
                <span className="text-blue-700">Lembaga Pendidikan</span>
                <span className="block">
                    untuk membentuk perubahan positif di dunia Pendidikan
                </span>
            </span>
            <div className="h-auto p-0 w-full lg:w-10/12 gap-x-6 lg:gap-x-20 flex items-center justify-center flex-wrap">
                {icons.map((icon, index) => {
                    return (
                        <img
                            key={index}
                            src={icon.imgPath}
                            alt={icon.altText}
                            className={icon.style + ' '}
                            draggable={false}
                        />
                    )
                })}
            </div>
        </section>
    )
}

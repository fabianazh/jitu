import TestimonialsCard from '@/Components/Card/TestimonialCard'
import DefaultAvatar from '@/Assets/Img/Avatar/DefaultAvatar.jpg'

export default function TestimonialsSection() {
    return (
        <section
            id="testimonials"
            className="w-full scroll-mt-24 px-5 lg:px-24 mb-20 lg:mb-56 relative"
        >
            <div className="w-full h-auto flex flex-col lg:flex-row gap-5 items-start">
                <div className="w-full h-auto flex flex-col gap-7 lg:gap-16">
                    <div className="flex flex-col h-fit w-full gap-3 lg:gap-7 px-1">
                        <span className="text-2xl lg:text-4xl font-semibold text-black">
                            Apa{' '}
                            <span className="text-blue-700 font-bold">
                                Pendapat{' '}
                            </span>
                            Orang
                            <br />
                            Tentang{' '}
                            <span className="text-blue-700 font-bold">
                                Kami
                            </span>
                        </span>
                        <span className="text-sm lg:text-base font-medium">
                            Temukan sentimen dari mereka yang telah merasakan
                            dampak transformasional Jitu dalam kedisiplin di
                            sekolah
                        </span>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-5">
                        <TestimonialsCard customClass="lg:translate-y-20">
                            <TestimonialsCard.Text>
                                Terima kasih kepada tim Jitu atas dedikasi dan
                                kerja kerasnya atas program kedisiplinan ini.
                                Jitu memberikan dampak positif bagi kedisiplinan
                                siswa dan pengelolaan sekolah secara
                                keseluruhan. Sistem ini membantu kami lebih
                                efisien dan efektif dalam mengatasi dan mencatat
                                pelanggaran siswa. Kita bersama-sama membangun
                                lingkungan belajar yang lebih baik.
                            </TestimonialsCard.Text>
                            <TestimonialsCard.Profile
                                imgPath={DefaultAvatar as unknown as string}
                                altText="Jaja Drajat S.H Image"
                                name="Jaja Drajat S.H"
                                role="Kepala Sekolah SMK Pasim"
                            />
                        </TestimonialsCard>
                        <TestimonialsCard customClass="">
                            <TestimonialsCard.Text>
                                Dengan tulus hati, saya menyampaikan apresiasi
                                kepada tim Jitu. Keberadaan program ini
                                membuktikan dedikasi tinggi mereka terhadap
                                kedisiplinan dan pengelolaan sekolah. Jitu telah
                                menjadi alat yang luar biasa dalam memantau dan
                                menangani pelanggaran siswa dengan efisien.
                                Semoga pengembangan ini terus memberikan
                                kontribusi positif bagi perbaikan lingkungan
                                belajar kita.
                            </TestimonialsCard.Text>
                            <TestimonialsCard.Profile
                                imgPath={DefaultAvatar as unknown as string}
                                altText="Image"
                                name="Dadang Hidayat"
                                role="Wakil Kepala Sekolah SMK Pasim"
                            />
                        </TestimonialsCard>
                    </div>
                </div>
                <div className="w-full h-auto grid lg:grid-cols-2 gap-x-5">
                    <div className="flex flex-col h-auto w-full gap-5">
                        <TestimonialsCard customClass="">
                            <TestimonialsCard.Text>
                                Terima kasih Jitu, karena telah memberikan
                                kemudahan dalam menangani pelanggaran siswa
                                dengan efisien. Semoga terus memberikan
                                kontribusi positif untuk peningkatan
                                kedisiplinan di sekolah kita.
                            </TestimonialsCard.Text>
                            <TestimonialsCard.Profile
                                imgPath={DefaultAvatar as unknown as string}
                                altText="Image"
                                name="Ghina Meilati S.Kom"
                                role="Kaprodi PPLG"
                            />
                        </TestimonialsCard>
                        <TestimonialsCard customClass="">
                            <TestimonialsCard.Text>
                                Tetap semangat dan sukses untuk tim Jitu.
                                Dedikasi dan kerja keras kalian dalam
                                mengembangkan program kedisiplinan patut
                                diacungi jempol. Keberadaan Jitu membantu kami
                                dalam mengatasi pelanggaran siswa dengan lebih
                                efisien. Semoga inovasi ini terus bermanfaat
                                bagi kemajuan sekolah kita.
                            </TestimonialsCard.Text>
                            <TestimonialsCard.Profile
                                imgPath={DefaultAvatar as unknown as string}
                                altText="Image"
                                name="Resi Ainun S.Pd"
                                role="Wali Kelas XII PPLG"
                            />
                        </TestimonialsCard>
                    </div>
                    <div className="flex flex-col h-auto w-full gap-5 translate-y-6 lg:translate-y-20">
                        <TestimonialsCard customClass="">
                            <TestimonialsCard.Text>
                                Saya sebagai alumni SMK Pasim merasa puas dalam
                                menggunakan Jitu. Program kedisiplinan yang
                                mereka rancang sangat inovatif, efisien, dan
                                juga memberikan kontribusi positif dalam
                                mengelola disiplin sekolah. Terima kasih untuk
                                tim Jitu!
                            </TestimonialsCard.Text>
                            <TestimonialsCard.Profile
                                imgPath={DefaultAvatar as unknown as string}
                                altText="Image"
                                name="Fabian Azhar"
                                role="Alumni SMK Pasim"
                            />
                        </TestimonialsCard>
                        <TestimonialsCard customClass="">
                            <TestimonialsCard.Text>
                                Pendapat saya mengenai Jitu, Jitu sangat
                                bermanfaat bagi pihak sekolah dan siswa. Saya
                                sangat mengapresiasi upaya mereka dalam
                                menciptakan program kedisiplinan. Inovatif,
                                efisien, dan membantu pengelolaan kedisiplinan
                                di sekolah. Sukses selalu tim Jitu.
                            </TestimonialsCard.Text>
                            <TestimonialsCard.Profile
                                imgPath={DefaultAvatar as unknown as string}
                                altText="Image"
                                name="RKR"
                                role="Siswa SMK Pasim"
                            />
                        </TestimonialsCard>
                    </div>
                </div>
            </div>
        </section>
    )
}

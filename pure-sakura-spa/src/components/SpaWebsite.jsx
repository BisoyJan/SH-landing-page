'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const SpaWebsite = () => {
	const [activeIndex, setActiveIndex] = React.useState(0);

	return (
		<div className="min-h-screen text-white bg-black">
			{/* Hero Section with Background Image */}
			<div className="relative h-screen">
				<div className="absolute inset-0 bg-black/70">
					{/* Use your first image for background */}
					<img
						src="/images/bg.jpg"
						alt="Spa treatment room with cherry blossoms"
						className="object-cover w-full h-full opacity-30"
					/>
				</div>
				<div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
					{/* Use image 5 (logo) here */}
					<img
						src="/images/logo.png"
						alt="PSH Logo"
						className="w-32 h-32 mb-8 rounded-full"
					/>
					<h1 className="mb-4 font-serif text-5xl">Pure Sakura Healing</h1>
					<h2 className="mb-8 font-serif text-3xl text-pink-300">
						Japanese Wellness Spa
					</h2>
					<p className="max-w-2xl mx-auto mb-8 text-lg">
						Experience authentic Japanese{' '}
						<span className="relative group">
							<span className="underline cursor-pointer">OMOTENASHI</span>
							<span className="absolute left-0 hidden p-2 mt-1 text-md text-white bg-black rounded-lg group-hover:block">
								Omotenashi is the Japanese concept of wholehearted hospitality
								and service.
							</span>
						</span>{' '}
						service with our carefully selected treatments designed to relax
						both your mind and body. Our certified therapists bring the essence
						of Japan to every session.
					</p>
					<button className="px-8 py-3 text-lg transition bg-pink-500 rounded-full hover:bg-pink-600">
						Book Now
					</button>
				</div>
			</div>

			{/* Services Section */}
			<section className="px-4 py-20 bg-gray-900">
				<div className="max-w-6xl mx-auto">
					<h2 className="mb-16 font-serif text-3xl text-center">
						Our Massage Services
					</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{services.map((service, index) => (
							<div key={index} className="relative group">
								<img
									src={service.image}
									alt={service.name}
									className="object-cover w-full h-64 transition rounded-lg brightness-75 group-hover:brightness-100"
									onError={(e) => {
										e.target.src = '/images/Massage.jpg';
									}}
								/>
								<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black">
									<h3 className="mb-2 font-serif text-xl">{service.name}</h3>
									<p className="text-gray-300">{service.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Hot Stone Therapy Feature */}
			<section className="px-4 py-20">
				<h2 className="mb-16 font-serif text-3xl text-center">
					Signature Hot Stone Therapy
				</h2>
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						{/* Use image 2 here - hot stone therapy */}
						<img
							src="/api/placeholder/600/400"
							alt="Hot stone therapy treatment"
							className="object-cover w-full rounded-lg h-80"
						/>
						<div className="flex flex-col justify-center">
							<h3 className="mb-4 font-serif text-2xl">
								Traditional Japanese Technique
							</h3>
							<p className="mb-6 text-gray-300">
								Our signature hot stone therapy combines smooth, heated basalt
								stones with traditional Japanese massage techniques. The warmth
								of the stones helps to relax muscles and improve circulation
								while our skilled therapists apply gentle pressure for deep
								relaxation.
							</p>
							<ul className="space-y-4">
								<li className="flex items-center">
									<span className="w-2 h-2 mr-3 bg-pink-500 rounded-full"></span>
									Premium basalt stones for optimal heat retention
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 mr-3 bg-pink-500 rounded-full"></span>
									Authentic Japanese aromatherapy oils
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 mr-3 bg-pink-500 rounded-full"></span>
									Customized pressure and technique for your needs
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Treatment Room Gallery */}
			<section className="px-4 py-20 bg-gray-900">
				<h2 className="mb-16 font-serif text-3xl text-center">
					Our Wellness Space
				</h2>
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{/* Use image 1, 3, and 4 here for the treatment rooms */}
						<div className="overflow-hidden rounded-lg">
							<img
								src="/api/placeholder/400/600"
								alt="Treatment room with cherry blossoms"
								className="object-cover w-full transition duration-500 h-80 hover:scale-105"
							/>
						</div>
						<div className="overflow-hidden rounded-lg">
							<img
								src="/api/placeholder/400/600"
								alt="Hot stone treatment setup"
								className="object-cover w-full transition duration-500 h-80 hover:scale-105"
							/>
						</div>
						<div className="overflow-hidden rounded-lg">
							<img
								src="/api/placeholder/400/600"
								alt="Spa treatment area"
								className="object-cover w-full transition duration-500 h-80 hover:scale-105"
							/>
						</div>
					</div>
					<div className="mt-12 text-center">
						<p className="max-w-3xl mx-auto text-gray-300">
							Our tranquil treatment rooms feature premium massage beds, soft
							lighting, and authentic Japanese aesthetics enhanced with cherry
							blossoms. Each space is designed to transport you to the peaceful
							gardens of Japan.
						</p>
					</div>
				</div>
			</section>

			{/* Testimonial Carousel */}
			<section className="px-4 py-20 bg-gray-900">
				<h2 className="mb-16 font-serif text-3xl text-center">
					Client Testimonials
				</h2>

				<div className="max-w-4xl mx-auto overflow-hidden">
					<div className="relative">
						<div className="flex transition-transform duration-300 ease-in-out">
							{testimonials.map((testimonial, index) => (
								<div
									key={index}
									className="w-full flex-shrink-0 px-8 py-10 bg-black rounded-lg"
									style={{
										transform: `translateX(-${activeIndex * 100}%)`,
										transition: 'transform 0.7s ease-in-out',
									}}>
									<svg
										className="absolute text-pink-500/10 right-4 top-4"
										width="120"
										height="120"
										viewBox="0 0 24 24"
										fill="currentColor">
										<path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z" />
									</svg>

									<blockquote className="relative">
										<p className="text-lg text-gray-200">{testimonial.quote}</p>
										<footer className="mt-6">
											<div className="flex items-center">
												<div className="ml-4">
													<p className="text-base font-semibold text-white">
														{testimonial.name}
													</p>
													<p className="text-sm text-gray-400">
														Regular Client
													</p>
												</div>
											</div>
										</footer>
									</blockquote>
								</div>
							))}
						</div>

						{/* Carousel Indicators */}
						<div className="flex justify-center mt-6 space-x-2">
							{testimonials.map((_, index) => (
								<button
									key={index}
									className={`w-2 h-2 rounded-full transition-colors ${
										index === activeIndex ? 'bg-pink-500' : 'bg-gray-600'
									}`}
									onClick={() => setActiveIndex(index)}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Booking Form and Map */}
			<section className="px-4 py-20">
				<div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
					<div>
						<h2 className="mb-8 font-serif text-3xl text-center">
							Book Your Session
						</h2>
						<form className="space-y-6">
							<div className="space-y-4">
								<input
									type="text"
									placeholder="Full Name"
									className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
								/>
								<input
									type="tel"
									placeholder="Contact Number"
									className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
								/>
								<input
									type="email"
									placeholder="Email Address"
									className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
								/>
								<select className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500">
									<option value="">Select Treatment</option>
									<option value="swedish">Swedish Massage</option>
									<option value="shiatsu">Shiatsu Massage</option>
									<option value="hotstone">Hot Stone Therapy</option>
									<option value="signature">
										Signature Cherry Blossom Experience
									</option>
								</select>
								<textarea
									placeholder="Any special requests or notes?"
									rows={4}
									className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
								/>
							</div>
							<button className="w-full py-3 text-white transition bg-pink-500 rounded-lg hover:bg-pink-600">
								Book Now
							</button>
						</form>
					</div>
					<div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d331823.7402851301!2d120.66378321651236!3d14.566305186929052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9abc24f9f85%3A0xd920d66f8809d165!2s7829%20Makati%20Ave%2C%20Makati%2C%20Metro%20Manila!5e1!3m2!1sen!2sph!4v1739808185273!5m2!1sen!2sph"
							width="600"
							height="450"
							style={{ border: 0 }}
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"></iframe>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="px-4 py-12 bg-black border-t border-gray-800">
				<div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
					<div>
						<img
							src="/images/logo.png"
							alt="PSH Logo"
							className="w-24 h-24 mb-4 rounded-full"
						/>
						<p className="text-gray-400">
							Experience authentic Japanese wellness and healing traditions in a
							serene environment.
						</p>
					</div>
					<div>
						<h3 className="mb-4 font-serif text-xl">Contact</h3>
						<ul className="space-y-2 text-gray-400">
							<li>Email: info@puresakurahealing.com</li>
							<li>Phone: (555) 123-4567</li>
							<li>Address: 123 Wellness Street, Serenity City</li>
							<li>Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 font-serif text-xl">Follow Us</h3>
						<div className="flex mb-6 space-x-4">
							<a
								href="#"
								className="text-gray-400 transition hover:text-pink-500">
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
							</a>
							<a
								href="#"
								className="text-gray-400 transition hover:text-pink-500">
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24">
									<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
								</svg>
							</a>
						</div>
						<p className="text-sm text-gray-400">
							&copy; {new Date().getFullYear()} Pure Sakura Healing. All rights
							reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

const services = [
	{
		name: 'Swedish Massage',
		description:
			'Traditional oil massage for deep relaxation and improved circulation.',
		image: '/images/Massage.jpg',
	},
	{
		name: 'Shiatsu Massage',
		description:
			'Japanese pressure point therapy to balance energy flow and reduce stress.',
		image: '/images/Massage.jpg',
	},
	{
		name: 'Hot Stone Therapy',
		description:
			'Premium hot stone massage with authentic Japanese techniques for ultimate relaxation.',
		image: '/images/Massage.jpg',
	},
	{
		name: 'Aromatherapy Session',
		description:
			'Custom blend of Japanese essential oils to elevate your massage experience.',
		image: '/images/Massage.jpg',
	},
	{
		name: 'Cherry Blossom Special',
		description:
			'Our signature treatment combining multiple techniques with sakura-infused products.',
		image: '/images/Massage.jpg',
	},
	{
		name: 'Couples Experience',
		description:
			'Share the healing journey with a partner in our specially designed suite.',
		image: '/images/Massage.jpg',
	},
];

const testimonials = [
	{
		name: 'Nuk Herzfled',
		quote:
			'"I went there today for my first Swedish massage and my masseuse was called Wendy. The massage facilities are very clean and the material is good so you can lie down comfortably. All the staff are very friendly and I have never had a better massage. I am already looking forward to future visits."',
	},
	{
		name: 'John Tanaka',
		quote:
			'The hot stone therapy is a must-try! The combination of heat and pressure is incredibly soothing. I always leave feeling refreshed and energized.',
	},
	{
		name: 'Emily Chen',
		quote:
			'The treatment rooms are beautifully designed and the therapists are highly skilled. I love the attention to detail and the personalized service.',
	},
];

export default SpaWebsite;

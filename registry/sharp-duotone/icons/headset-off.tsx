import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HeadsetOff({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17 17.001H18C18.5523 17.001 19 17.4487 19 18.001V22.001C19 22.5532 18.5523 23.001 18 23.001H11V21.001H17V19.001H16C15.4477 19.001 15 18.5532 15 18.001V16.001H17V17.001ZM6.25195 6.00391C6.028 6.3253 5.83133 6.66679 5.66309 7.02441C5.77481 7.00868 5.88727 7 6 7H8C8.5523 7 9 7.4477 9 8V18C9 18.5523 8.5523 19 8 19H6C4.4812 19 3 17.5188 3 16V9.99707C3.00081 8.08941 3.59652 6.3178 4.61133 4.86133L6.25195 6.00391Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 1C16.9705 1.0001 21 5.02947 21 10V15.3398H19V10L18.9951 9.89746C18.9438 9.39336 18.5176 9.00009 18 9H17V11.3428H15V8C15 7.44776 15.4478 7.00007 16 7H18C18.1129 7.00001 18.2244 7.00641 18.334 7.01855C17.2143 4.64388 14.7995 3.00007 12 3C10.891 3.00002 9.84434 3.2568 8.91504 3.71387L7.79883 4.26367L6.91602 2.46875L8.03223 1.91992C9.23022 1.33067 10.5782 1.00002 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.70715 1.70703L22.293 22.2928"/>
    </svg>
  )
}

import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HeadphonesOff({ size = 24, ...props }: IconProps) {
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
      <path d="M18 20.001H19C19.2763 20.001 19.525 19.89 19.707 19.708L21.1211 21.1221C20.5794 21.6637 19.8281 22.001 19 22.001H17C16.4478 22.001 16.0001 21.5531 16 21.001V17.001H18V20.001ZM6.34277 6.34375C5.58046 7.10615 4.9731 8.02147 4.56738 9.03906C4.7104 9.01333 4.85504 9 5 9H7C7.5523 9 8 9.4477 8 10V21C8 21.5523 7.5523 22 7 22H5C3.4812 22 2 20.5188 2 19V12C2 11.9524 2.00104 11.9049 2.00391 11.8574C2.04201 9.15323 3.15173 6.70683 4.92871 4.92969L6.34277 6.34375Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 2C17.5228 2.00009 22 6.47717 22 12V16.3398H20V12L19.9951 11.8975C19.9438 11.3934 19.5176 11.0001 19 11H18V12.3428H16V10C16 9.44776 16.4478 9.00007 17 9H19C19.1452 9.00001 19.2881 9.01033 19.4277 9.03027C18.2483 6.08298 15.3685 4.00007 12 4C11.1049 4.00001 10.2454 4.14622 9.44434 4.41602L8.49707 4.73535L7.8584 2.83984L8.80664 2.52148C9.81065 2.18336 10.8851 2.00001 12 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.70715 1.70703L22.293 22.2928"/>
    </svg>
  )
}

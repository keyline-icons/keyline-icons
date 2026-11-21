import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hat({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 19.5L5.5 19.5C4.9477 19.5 4.5 19.0523 4.5 18.5C4.5 18.4448 4.5046 18.3897 4.5137 18.3353L6.4875 6.5171C6.5874 5.8359 6.8938 5.219 7.3555 4.7627C7.822 4.3016 8.4556 4 9.1665 4L9.6197 4C9.9904 4 10.3413 4.1183 10.634 4.3232L11.912 5.2178C11.9518 5.2457 11.9818 5.2507 12 5.2507C12.0182 5.2507 12.0482 5.2457 12.0879 5.2178L13.3658 4.3233C13.6587 4.1183 14.0096 4 14.3803 4L14.8335 4C15.5444 4 16.178 4.3016 16.6445 4.7627C17.1062 5.219 17.4126 5.8359 17.5125 6.5171L19.4863 18.3353C19.4954 18.3897 19.5 18.4448 19.5 18.5C19.5 19.0523 19.0523 19.5 18.5 19.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 14C2 16.7614 4.23858 19 7 19H17C19.7614 19 22 16.7614 22 14"/>
      <path d="M5.5718 12L6.5715 12L17.4285 12L18.4282 12L18.7622 14L17.4285 14L6.5715 14L5.2378 14Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}

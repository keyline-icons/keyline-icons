import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Club({ size = 24, ...props }: IconProps) {
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
      <path d="M7.6128 8.5014C7.5378 8.1729 7.5 7.8371 7.5 7.5002C7.5 5.0149 9.5147 3.0002 12 3.0002C14.4853 3.0002 16.5 5.0149 16.5 7.5002C16.5 7.8371 16.4622 8.1729 16.3872 8.5014C16.4248 8.5005 16.4623 8.5 16.4999 8.5C18.9852 8.5 20.9999 10.5147 20.9999 13C20.9999 15.4853 18.9852 17.5 16.4999 17.5C15.61 17.5 14.74 17.2361 14 16.7417L14 18.0858C14 18.351 14.1054 18.6054 14.2929 18.7929L14.7929 19.2929C14.9804 19.4804 15.0858 19.7348 15.0858 20C15.0858 20.5523 14.6381 21 14.0858 21L9.9142 21C9.3619 21 8.9142 20.5523 8.9142 20C8.9142 19.7348 9.0196 19.4804 9.2071 19.2929L9.7071 18.7929C9.8946 18.6054 10 18.351 10 18.0858L10 16.7417C9.26 17.2361 8.39 17.5 7.5001 17.5C5.0148 17.5 3.0001 15.4853 3.0001 13C3.0001 10.5147 5.0148 8.5 7.5001 8.5C7.5377 8.5 7.5752 8.5005 7.6128 8.5014Z"/>
    </svg>
  )
}

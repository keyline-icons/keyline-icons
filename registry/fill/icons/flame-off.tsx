import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlameOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19.2854 19.2854C17.5935 21.6206 14.8838 23.0023 12 23C7.0294 23 3 18.9706 3 14C3 12.6858 3.2878 11.3876 3.8432 10.1965C4.1716 9.4919 4.8786 9.0414 5.656 9.0414C6.7606 9.0414 7.656 9.9368 7.656 11.0414C7.656 11.3927 7.5635 11.7377 7.3878 12.0419C7.3 12.1939 7.2538 12.3664 7.2538 12.5419C7.2538 13.0942 7.7016 13.5419 8.2539 13.5419C8.8062 13.5419 9.254 13.0941 9.2539 12.5417C9.2538 11.5458 9.3635 10.553 9.5812 9.5812L19.2854 19.2854ZM11.0654 5.7752C12.1415 3.9091 13.6474 2.3267 15.4581 1.1596C15.6197 1.0553 15.8079 0.9999 16.0002 0.9999C16.5525 0.9999 17.0002 1.4477 17 2C17 3.9473 17.6316 5.8421 18.8 7.4C20.2273 9.3024 20.9989 11.6165 20.9989 13.9948C20.9989 14.1224 20.9967 14.25 20.9922 14.3775L20.9723 14.3767C20.9508 14.9018 20.5188 15.3164 19.9933 15.3164C19.7333 15.3164 19.4839 15.2131 19.3001 15.0292L19.286 15.0433L11.2246 6.982L11.2388 6.9679C11.0549 6.7841 10.9516 6.5347 10.9516 6.2748C10.9516 6.1029 10.9968 5.934 11.0826 5.7852L11.0654 5.7752Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22" fill="none"/>
    </svg>
  )
}

import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Rotate3d({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.977 2.15L11.804 2.96L10.101 6.8C9.779 7.52 9.52 8.27 9.328 9.04C8.98 10.43 8.862 11.97 8.961 13.4L9.489 13.48C9.665 13.51 9.845 13.53 10.023 13.55C11.337 13.7 12.665 13.7 13.978 13.55C15.806 13.35 17.592 12.86 19.272 12.12L21.594 11.08L22.407 12.91L20.085 13.95C18.217 14.78 16.231 15.31 14.199 15.54C12.739 15.7 11.263 15.7 9.803 15.54C9.688 15.53 9.398 15.48 9.28 15.47C9.582 16.69 10.092 18.03 10.715 19.12L11.759 20.95L10.02 21.94L8.978 20.11C8.145 18.65 7.552 17.07 7.223 15.42L7.154 15.06L6.742 14.95C5.779 14.69 4.832 14.35 3.917 13.95L1.594 12.91L2.407 11.09L4.729 12.12C5.266 12.36 5.816 12.57 6.372 12.75L6.931 12.93C6.895 11.51 7.045 9.93 7.389 8.55C7.608 7.68 7.905 6.81 8.273 5.98L9.977 2.15Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 1C18.075 1 23 5.92 23 12C23 18.08 18.075 23 12 23C5.925 23 1 18.08 1 12C1 5.92 5.925 1 12 1ZM12 3C7.029 3 3 7.03 3 12C3 16.97 7.029 21 12 21C16.971 21 21 16.97 21 12C21 7.03 16.971 3 12 3Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}

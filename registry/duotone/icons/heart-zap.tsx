import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HeartZap({ size = 24, ...props }: IconProps) {
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
      <path d="M8 2C9.4846 2 10.8273 2.46 11.999 3.25C12.5188 2.9 13.0744 2.61 13.6641 2.4C13.9703 2.29 14.3104 2.34 14.5762 2.53C14.8419 2.71 15 3.02 15 3.34V9C15 10.66 16.3431 12 18 12H20.6143C20.9823 12 21.3208 12.2 21.4951 12.53C21.6694 12.85 21.6513 13.24 21.4482 13.55C20.415 15.11 18.9614 16.52 17.4209 17.83C16.6471 18.5 15.8359 19.15 15.0322 19.8C14.2244 20.45 13.4232 21.1 12.6494 21.76C12.2754 22.08 11.7246 22.08 11.3506 21.76C9.1622 19.89 6.5418 17.98 4.5781 15.99C2.582 13.97 1 11.64 1 8.75C1 4.98 4.1744 2 8 2Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M20.2929 2.29C20.6835 1.9 21.3165 1.9 21.707 2.29C22.0975 2.68 22.0975 3.32 21.707 3.71L20.414 5H22C22.4044 5 22.769 5.24 22.9238 5.62C23.0785 5.99 22.993 6.42 22.707 6.71L19.707 9.71C19.3165 10.1 18.6835 10.1 18.2929 9.71C17.9024 9.32 17.9024 8.68 18.2929 8.29L19.5859 7H18C17.5956 7 17.231 6.76 17.0761 6.38C16.9214 6.01 17.007 5.58 17.2929 5.29L20.2929 2.29Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}

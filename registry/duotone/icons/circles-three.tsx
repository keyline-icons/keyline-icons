import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CirclesThree({ size = 24, ...props }: IconProps) {
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
      <path d="M2.3818 11.83C2.5963 11.54 2.9169 11.45 3.2256 11.52C3.5337 11.58 3.8312 11.8 3.9961 12.12C5.4906 15.02 8.5134 17 12 17C12.5257 17 13.0412 16.95 13.542 16.87C13.8883 16.81 14.2332 16.91 14.4658 17.11C14.6695 17.29 14.7778 17.61 14.7384 17.89C13.8926 20.81 11.1872 23 8 23C4.134 23 1 19.87 1 16C1 14.44 1.514 12.99 2.3818 11.83Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 1C15.866 1 19 4.13 19 8C19 11.87 15.866 15 12 15C8.134 15 5 11.87 5 8C5 4.13 8.134 1 12 1Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M16 9C19.866 9 23 12.13 23 16C23 19.87 19.866 23 16 23C12.134 23 9 19.87 9 16C9 12.13 12.134 9 16 9Z" fill="currentColor"/>
    </svg>
  )
}

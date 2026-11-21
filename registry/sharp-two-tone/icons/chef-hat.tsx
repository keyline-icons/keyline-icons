import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChefHat({ size = 24, ...props }: IconProps) {
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
      <path d="M5 17L5 12.7002C3.9788 12.3543 3.0839 11.7673 2.4002 11.0211C1.5427 10.0851 1 8.8763 1 7.5714C1 5.9781 1.6772 4.5565 2.7696 3.5422C3.8598 2.5299 5.3548 1.9286 7 1.9286C7.4978 1.9286 7.9487 1.9832 8.3842 2.0935C9.3538 1.3921 10.6185 1 12 1C13.3815 1 14.6462 1.3921 15.6158 2.0935C16.0513 1.9832 16.5022 1.9286 17 1.9286C18.6452 1.9286 20.1402 2.5299 21.2304 3.5422C22.3228 4.5565 23 5.9781 23 7.5714C23 8.8763 22.4573 10.0851 21.5998 11.0211C20.9161 11.7673 20.0212 12.3543 19 12.7002L19 17L19 22C19 22.5523 18.5523 23 18 23L6 23C5.4477 23 5 22.5523 5 22Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 18.5L6 11.9357C3.7 11.4714 2 9.6143 2 7.5714C2 4.9714 4.2 2.9286 7 2.9286C7.6 2.9286 8.1 3.0214 8.6 3.2071C9.4 2.4643 10.6 2 12 2C13.4 2 14.6 2.4643 15.4 3.2071C15.9 3.0214 16.4 2.9286 17 2.9286C19.8 2.9286 22 4.9714 22 7.5714C22 9.6143 20.3 11.4714 18 11.9357L18 18.5M6 17L18 17L18 22L6 22Z"/>
    </svg>
  )
}
